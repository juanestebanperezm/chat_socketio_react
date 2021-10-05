import React from "react";
import { render } from "react-dom";
import io from 'socket.io-client'


class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          messages: []
        }
      }
    
      componentDidMount () {
        this.socket = io('/')
        this.socket.on('message', message => {
        message=()=>this.setState({ messages: [message, ...this.state.messages]})
        })
      }
    
      handleSubmit ( event) {
        const body = event.target.value
        if (event.keyCode === 13 && body) {
          const message = {
            body,
            from: 'Me'
          }
         this.setState({ messages: [message, ...this.state.messages]})
          this.socket.emit('message', body)
          event.target.value = ''
        }
      }
    
      render() {
        const messages = this.state.messages.map((message, index) => {
          return <li key={index}>
            <b>{message.from}: {message.body}</b>
          </li>
        });
    
        return(
          <div>
<div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Bienvenid@!</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
  </div>
</nav>
            </div>

            <div className='container p-4'>
            <h1>Chat Socket IO ReactJS!</h1>
            <input
                type="text"
                placeholder='Envia un mensaje'
                onKeyUp={this.handleSubmit.bind(this)}/>
            {messages}
            </div>



           
          </div>
        )
      }
}


render(
    
    <App/>,
    document.getElementById('app')
)