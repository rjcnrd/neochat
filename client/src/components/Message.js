import React, { Component } from 'react';
import api from '../api';


class Message extends Component {
 
  render() {                
    return (
      <div className="Message">
        {(api.loadUser().id === this.props.message._creator) && <div className="right ml-auto text-right">
          <p>{ this.props.message.text? this.props.message.text : <img alt="Yolo" className="gif-picture" src={this.props.message.imgUrl}/> }</p>
          </div>}

        {(api.loadUser().id !== this.props.message._creator) && <div className="left mr-auto text-left"><p>{ this.props.message.text? this.props.message.text : <img alt="Gif" src={this.props.message.imgUrl}/> }</p>
          </div>}
  
      </div>
    );
  }
}

export default Message;

