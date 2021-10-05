//Express
const express=require('express')
const app=express()
const path=require('path')
const http=require('http')
const server=http.createServer(app);
//Socket io
const socketIo=require('socket.io')
const io=socketIo(server)

//Webpack
const webpack=require('webpack')
const webpackDevMiddelware=require('webpack-dev-middleware')
const config=require('./webpack.config')

//Path join 
app.use(express.static(path.join(__dirname,'public')))


//Middleware

app.use(webpackDevMiddelware(webpack(config)));

//io con
io.on('connection', socket => {
    socket.on('message', body => {
      socket.broadcast.emit('message', {
        body,
        from: socket.id.slice(8)
      })
    })
  })

//Server on port
server.listen(3000,()=>{
    console.log('server on port 3000')
})