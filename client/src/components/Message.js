import React, { Component } from 'react';
import api from '../api';


class Message extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {                
    return (
      <div className="MyMessage">
        {(api.loadUser().id === this.props.message._creator) && <div className="right"><p>{this.props.message.text}</p></div>}

        {(api.loadUser().id !== this.props.message._creator) && <div className="left"><p>{this.props.message.text}</p></div>}
  
      </div>
    );
  }
}

export default Message;

