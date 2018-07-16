import React, { Component } from 'react';
import api from "../api";

// import Friends from './Friends';
// import Conversations from "./Conversations";

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        Willkommen {api.loadUser().name}
      </div>
    );
  }
}

export default Home;

