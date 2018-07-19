import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Conversations from "./Conversations"
import {Button,Row,Col} from 'reactstrap';



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

    console.log("giphycall",api.getGiphy("cat"))

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
    
    // api
    // .getFriends()
    // .then(friends => {
    //   console.log("friends", friends);
    //   this.setState({
    //     friends: friends
    //   });
    // })
    // .catch(err => console.log(err));
    
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


  render() {                
    return (
      <div className="App">
        <header className="App-header">
        
        
          <h1>neochat 
          {api.isLoggedIn() &&  <Link to="/" onClick={(e) => this.handleLogoutClick(e)}><img height="50px" src="https://media.giphy.com/media/AmDzMmCJZABsk/giphy.gif"/></Link> }
          </h1> 
          {/* <Link to="/">Home</Link>  */}
          {/* <Link to="/countries">Countries</Link> 
          <Link to="/add-country">Add country</Link>  */}
          {/* {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> } */}
          {/* {api.isLoggedIn() && <Link to="/conversations">conversations</Link> } */}
          {/* {api.isLoggedIn() && <img to="/" onClick={(e) => this.handleLogoutClick(e)}><Button>Logout</Button></Link> } */}

          
        </header>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
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
