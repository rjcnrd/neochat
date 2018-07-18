import React, { Component } from 'react';
import api from '../api';
import { Button } from "reactstrap";



class SuggestedResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionText: "Will be created by API call",
    }
  } 
  
  // how do i get the other participant into the conversation 

  handleClick(){
    this.props.onPickSuggestion(this.state.suggestionText)
  }

  checkDisplay(){
    return (this.props.authorOfLastMessage !== api.loadUser().id)
  }

  render() {                
    return (
       this.checkDisplay() && 

        <div className="SuggestedResponse">
          I am the suggested response and will not be displayed for {this.props.authorOfLastMessage}
          {this.suggestionText}
          
          <Button onClick={()=>this.handleClick()}/>
        </div>
      
      
    )
}
}
export default SuggestedResponse;

