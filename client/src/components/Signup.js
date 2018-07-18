import React, { Component } from 'react';
import api from '../api';
import {Label,Input,Button,Form,FormGroup,Row,Col} from 'reactstrap';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
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
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <Form>
        <FormGroup>
          <Label for="exampleEmail" >Email</Label>
          <Input value={this.state.email} type="text" name="email" id="exampleEmail" placeholder="email@funkydomain.com" onChange={(e) => {this.handleInputChange("email", e)}} />
        </FormGroup>
        <FormGroup>
          <Label for="name">Username</Label>
          <Input value={this.state.name} type="text" name="email" id="exampleEmail" placeholder="don't be shy" onChange={(e) => {this.handleInputChange("name", e)}} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} name="password" id="examplePassword" placeholder="secret password" />
        <Button onClick={(e) => this.handleClick(e)}>Signup</Button>
        </FormGroup>
        </Form> 
         

        

      </div>
    );
  }
}

export default Signup;
