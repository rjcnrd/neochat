import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Conversations from "./Conversations"



import Login from './Login';
import Signup from './Signup';
import api from '../api';
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


    // // TODO!!!
    // setInterval(() => {
    //   api.getLastUserUpdate()
    //   .then(lastUserUpdate => {
    //     if (lastUserUpdate !== this.state.lastUserUpdate) {
    //       this.setState({
    //         lastUserUpdate
    //       })
    //     }
    //   })
    // }, 2000)
    api
    .getUsers().then(users => {
      this.setState({
        users: users,
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
          this.setState({
            conversations: conversations
          });
        })
        .catch(err => console.log(err));
    }, 20000)
  }
  
  // handleLogoutClick(e) {
  //   api.logout()
  // }


  render() {                
    return (
      <div className="App">
        <header className="App-header">  
          <h1>neochat 
          {api.isLoggedIn() &&  <Link to="/" onClick={(e) => this.handleLogoutClick(e)}><img alt="Seal" height="50px" src="https://media.giphy.com/media/AmDzMmCJZABsk/giphy.gif"/></Link> }
          </h1> 
         
        </header>
        <Switch>
          {api.isLoggedIn() && <Route path="/" component={Conversations} />} /> }
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>   
  
      </div>
    );
  }}

export default App;
