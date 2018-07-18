import React, { Component } from 'react';
import api from '../api';


class Message extends Component {
  constructor(props) {
    super(props)
  } 
  // how do i get the other participant into the conversation 


  

  render() {                
    return (
      <div className="Message">
        {(api.loadUser().id === this.props.message._creator) && <div className="right ml-auto text-right">
          <p>{ this.props.message.text? this.props.message.text : <img src={this.props.message.imgUrl}/> }</p>
          </div>}

        {(api.loadUser().id !== this.props.message._creator) && <div className="left mr-auto text-left"><p>{this.props.message.text}</p></div>}
  
      </div>
    );
  }
}

export default Message;

