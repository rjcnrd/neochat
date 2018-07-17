import React, { Component } from 'react';
import Message from "./Message";
import {Button } from "reactstrap";
import api from "../api";


 
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversation: [],
      newText: []
    }
  }
  
    handleInputChange(e){
      console.log("Handling Input Change", e.target.value)
      this.setState({
        newText: e.target.value,
      });
    }

 handleUpdateConversation(){
    this.props.onNewUserMessage(this.state.conversation._id, this.state.newText);
    this.setState({
      newText: "",
    });
  }

    componentDidUpdate() {
      api
      .getConversationbyId(this.props.match.params.conversationId)
      .then(conversation => {
        this.setState({
          conversation: conversation
        });
        
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    api
      .getConversationbyId(this.props.match.params.conversationId)
      .then(conversation => {
        this.setState({
          conversation: conversation
        });        
      })
      .catch(err => console.log(err));
  }
  
  render() {                
    return (
      <div className="Chat">
        <div className="col-12 conversationTitle"> 
          <p>"{this.state.conversation.title}"</p>
        </div>
        <span><input type="textarea" placeholder="Type your text here"  className="col-12 chatInput" onChange={(e) => this.handleInputChange(e)} value={this.state.newText}/></span>
        <Button className="col-12" onClick={(e) => this.handleUpdateConversation(e)}>Send</Button> 

        

        <div>
        {this.state.conversation._messages!==undefined ? this.state.conversation._messages.slice(0).reverse().map((message,i) => (<Message message={message} key={message._id}/>)):null}
        </div>
        
           
         
  
      </div>

    );
  }
}

export default Chat;

