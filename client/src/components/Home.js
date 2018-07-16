import React, { Component } from 'react';
import Friends from './Friends';
import Conversations from "./Conversations";

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
        <p>This is a sample project with the MERN stack</p>
      <Friends/>
      <Conversations />
      </div>
    );
  }
}

export default Home;

