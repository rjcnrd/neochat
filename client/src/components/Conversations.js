import React, { Component } from "react";
import api from "../api";
import Chat from './Chat';
import { Link, Route } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      addConversationVisible: "",
      users:[],
      newConversationName: "",
      newConversationPartner:"",
    };
    console.log("Conversation constructor")

  }

  // handleEditConversation(e) {
  //   e.preventDefault();
  //   console.log("handle edit conversation");
  //   api.editConversationbyId("5b4c644f843e6a1d2a554c10", { design: "Blu" });
  // }

  handleNewUserMessage(conversationId, newText) {
    api.addMessage(conversationId,
      {
        text: newText,
        _creator: api.loadUser().id,
      }
    )
    .then(()=>{
      api
      .getConversations()
      .then(conversations => {
        this.setState({
          conversations: conversations,
        });
      })
      .catch(err => console.log(err));
    })
    console.log("handleNewUserMessage, message created", conversationId, newText);
    console.log("new conversation state", this.state.conversations);
  }

  displayAddConversation(){
    this.setState({
      addConversationVisible: true,
    });
  }

  handleNameOfConversation(e)
  {
    this.setState({
      newConversationName: e.target.value,
    })
    console.log("conversation name", this.state.newConversationName)
  }

  handleConversationPartner(userId){
    this.setState({
      newConversationPartner: userId,
    })
    console.log("userId of the conversation partner",userId)
  }

  handleAddConversation(){
    api.addConversation({
      _participants:[this.state.newConversationPartner,api.loadUser().id],
      title: this.state.newConversationName
    })
    .then(()=>{console.log(" handleAddConversation passiert")})
    .then(()=>{
      api
      .getConversations()
      .then(conversations => {
        this.setState({
          conversations: conversations,
          addConversationVisible: false,
        });
      })
      .catch(err => console.log(err));
    })
  }

  componentDidMount() {
    api
      .getConversations()
      .then(conversations => {
        this.setState({
          conversations: conversations,
          addConversationVisible: false,
        });
      })
      .catch(err => console.log(err));

    api
    .getUsers()
    .then(users => {
      this.setState({
        users: users,
      });
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
       <div className="Conversations row">
        <div className="col-3 messagePreview">
            <p>Overview of all Conversations</p>
            {this.state.conversations.map((conversation,i) =>   
            <Link to={`/conversations/${conversation._id}`}><p>{conversation.title}</p></Link>
            )}

          <Button onClick={e => this.displayAddConversation(e)}>Add Conversation</Button>
          
            {this.state.addConversationVisible && 
            
            <div>
              <Label for="exampleSelect">Select Friend</Label>
              <Input type="select" name="users" id="exampleSelect">
              {this.state.users.map((u, i) =><option value={u._id} key={u._id} onSelect={() => this.handleConversationPartner(u._id)}>{u.name}</option>)}
              </Input>
              <Input type="email" name="email" placeholder="Chat Name" onChange={(e) => this.handleNameOfConversation(e)} />
              {/* <input type="textarea" placeholder="What do you want to talk about?" onChange={(e) => this.handleNameOfConversation(e)}/> */}
              
              <Button color="primary"onClick={() => this.handleAddConversation()}>Let's talk</Button>
            </div>
            }

            {/* <button onClick={e => this.handleEditConversation(e)}>
              {" "}
              Edit Conversation(hard coded)
            </button>
            <button onClick={e => this.handleAddMesage(e)}>
              Add Message (hard coded)
            </button>
    */}

        </div>

       <div className="col-9 messageDetails">

         <Route path="/conversations/:conversationId" 
          render={props => <Chat {...props} onNewUserMessage={this.handleNewUserMessage.bind(this)} />} 
        />
        </div>
        
       </div>
    );
  
  }
}


export default Conversations;
