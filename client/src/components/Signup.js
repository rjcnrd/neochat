import React, { Component } from 'react';
import api from '../api';
import {Label,Input,Button,Form,FormGroup,Row,Col} from 'reactstrap';
import {  Link } from 'react-router-dom';


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
        <h1>Sign up</h1>
        <p>and become part of the funniest chat community on the web</p>
        <Form>
        <FormGroup>
          <Label for="exampleEmail"><h3>Email</h3></Label>
          <Input value={this.state.email} type="text" name="email" id="exampleEmail" placeholder="email@funkydomain.com" onChange={(e) => {this.handleInputChange("email", e)}} />
        </FormGroup>
        <FormGroup>
          <Label for="name"><h3>Username</h3></Label>
          <Input value={this.state.name} type="text" name="email" id="exampleEmail" placeholder="don't be shy" onChange={(e) => {this.handleInputChange("name", e)}} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"><h3>Password</h3></Label>
          <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} name="password" id="examplePassword" placeholder="secret password" />
        </FormGroup>
        </Form> 
        <Button onClick={(e) => this.handleClick(e)}>Signup</Button>
        <p>
          woopsie, I do have an account... <Link to="/">log me in</Link>
        </p>
         

        

      </div>
    );
  }
}

export default Signup;
