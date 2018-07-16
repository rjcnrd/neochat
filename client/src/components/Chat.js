import React, { Component } from 'react';
import Message from "./Message";
import {Button} from "reactstrap";

 
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversation: this.props.conversation, 
      newText: []
    }
  }

  handleInputChange(e){
    console.log("Handling Input Change", e.target.value)
    this.setState({
      newText: e.target.value,
    });
  }

  handleNewMessage(){
    this.props.handleUpdateConversation(this.state.conversation._id,this.state.newText)
  }

  render() {                
    return (
      <div className="Chat">
        <p>I am a Chat component!</p>
        s
        <h3>Chat Title:"{this.props.conversation.title}"</h3>
        
        <div>
        {this.props.conversation._messages.map((message,i) => (<Message message={message} key={message._id}/>))}
        </div>
        
        <input type="text" onChange={(e) => this.handleInputChange(e)}/>
        <Button onClick={(e) => this.handleNewMessage(e)}>Submit</Button> 
          
         
  
      </div>
    );
  }
}

export default Chat;

