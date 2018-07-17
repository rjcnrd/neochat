import React, { Component } from "react";
import api from "../api";
import Chat from './Chat';

class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  handleUpdateConversation(conversationId,text){
    api.addMessage(conversationId,
      {
      text: text,
      _creator: api.loadUser().id,
    })
    .then(()=>api.getUserConversations(api.loadUser().id))
    .then(conversations => {
      this.setState({
        conversations: conversations
      });
    })
    .catch(err => console.log(err));
    console.log("message added to conversation, state updated")

  }

  handleAddConversation(e) {
    e.preventDefault();
    console.log("handle add conversation", e.target.value);
    api.addConversation({
      _participants: ["5b48b0bc7aedbdf4bbf40d4b", "5b48b0bc7aedbdf4bbf40d4e"],
      title: "New Conversation",
      design: "Standard"
    });
  }

  handleEditConversation(e) {
    e.preventDefault();
    console.log("handle edit conversation");
    api.editConversationbyId("5b4c644f843e6a1d2a554c10", { design: "Blu" });
  }

  handleAddMesage(e) {
    e.preventDefault();
    console.log("adding a message");
    api.addMessage("5b4c644f843e6a1d2a554c10", {
      text: "Wow this is the best chat app ever"
    });
  }

  componentDidMount() {
    api
      .getConversations()
      .then(conversations => {
        console.log("conversations", conversations);
        this.setState({
          conversations: conversations
        });
      })
      .catch(err => console.log(err));

    api
      .getConversationbyId("5b48b0cc7aedbdf4bbf40d53")
      .then(conversation => {
        console.log("conversation nummer 1", conversation);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="Conversations">
      <p>Overview of all Conversations</p>
        {/* <button onClick={e => this.handleAddConversation(e)}>
          {" "}
          Add Conversation (hard coded)
        </button>
        <button onClick={e => this.handleEditConversation(e)}>
          {" "}
          Edit Conversation(hard coded)
        </button>
        <button onClick={e => this.handleAddMesage(e)}>
          Add Message (hard coded)
        </button> */}

        {this.state.conversations.map((c,i) => <Chat conversation={c} key={i} handleUpdateConversation={this.handleUpdateConversation.bind(this)}/>)}

      </div>
    );
  }
}

export default Conversations;
