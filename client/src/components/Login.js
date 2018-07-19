import React, { Component } from 'react';
import api from '../api';
import {Label,Input,Button,Form,FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';


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
        <Form>
        <FormGroup>
          <Label for="exampleEmail"><h3>Email</h3></Label>
          <Input value={this.state.email} type="text" name="email" id="exampleEmail" placeholder="email@funkydomain.com" onChange={(e) => {this.handleInputChange("email", e)}} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"><h3>Password</h3></Label>
          <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} name="password" id="examplePassword" placeholder="your password" />
        </FormGroup>
        </Form> 
        <Button color="primary"onClick={(e) => this.handleClick(e)}>Login</Button>

<p>What? Not on neoChat yet? <Link to="/signup">Signup</Link> <br/>and become part of the community</p>        
      </div>
    );
  }
}

export default Login;
