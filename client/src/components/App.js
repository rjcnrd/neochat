import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
import {Button} from "reactstrap";
import Conversations from "./Conversations"


import Secret from './Secret';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: [],
      friends:[],
      users: []
    };
  }

  componentDidMount() {
    
    api
    .getFriends()
    .then(friends => {
      console.log("friends", friends);
      this.setState({
        friends: friends
      });
    })
    .catch(err => console.log(err));
    
    api
    .getUsers().then(users => {
      this.setState({
        users: [],
        conversations: []
      });
    })
    
  
    let id =  api.loadUser().id
    

      api
        .getUserConversations(id)
        .then(conversations => {
          console.log("conversations of this user", conversations);
          this.setState({
            conversations: conversations
          });
        })
        .catch(err => console.log(err));
  }

  componentDidUpdate() {
    setTimeout(() => {
      let id =  api.loadUser().id
      api
        .getUserConversations(id)
        .then(conversations => {
          console.log("conversations of this user", conversations);
          this.setState({
            conversations: conversations
          });
        })
        .catch(err => console.log(err));
    }, 2000)
  }
  
  
  
  handleLogoutClick(e) {
    api.logout()
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

  render() {                
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to neoChat</h1>
          <Link to="/">Home</Link> 
          {/* <Link to="/countries">Countries</Link> 
          <Link to="/add-country">Add country</Link>  */}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/conversations">conversations</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
          <Link to="/secret">Secret</Link> 
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/conversations" exact component={Conversations} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>   
        {/* display for each conversation a chat!  */}
        
        {this.state.conversations.map((c,i) => <Chat conversation={c} key={i} handleUpdateConversation={this.handleUpdateConversation.bind(this)}/>)}

  
      </div>
    );
  }}

export default App;
