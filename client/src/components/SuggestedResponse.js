import React, { Component } from 'react';
import api from '../api';


class SuggestedResponse extends Component {
  constructor(props) {
    super(props);
  } 
  
  // how do i get the other participant into the conversation 

  checkDisplay(){
    return (this.props.authorOfLastMessage !== api.loadUser().id)
  }

  render() {                
    return (
       this.checkDisplay() && 

        <div className="SuggestedResponse">
          I am the suggested response and will not be displayed for {this.props.authorOfLastMessage}
        </div>
      
      
    )
}
}
export default SuggestedResponse;

