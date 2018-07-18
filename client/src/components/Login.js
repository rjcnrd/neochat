import React, { Component } from 'react';
import api from '../api';
import {Label,Input,Button,Form,FormGroup,Row,Col} from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      
      <div className="Login">


        <h2>Login</h2>

        <Form>
        <FormGroup>
          <Label for="exampleEmail" >Email</Label>
          <Input value={this.state.email} type="text" name="email" id="exampleEmail" placeholder="email@funkydomain.com" onChange={(e) => {this.handleInputChange("email", e)}} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} name="password" id="examplePassword" placeholder="secret password" />
        <Button onClick={(e) => this.handleClick(e)}>Login</Button>
        </FormGroup>
        </Form> 
         
        
      </div>
    );
  }
}

export default Login;
