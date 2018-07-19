import React, { Component } from "react";
import Message from "./Message";
import { Button,  
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem ,
Row,
Col } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../api";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      newText: [],
    };
  }

  handleInputChange(e) {
    this.setState({
      newText: e.target.value
    });
  }

  handleUpdateConversation() {
    this.props.onNewUserMessage(
      this.state.conversation._id,
      this.state.newText
    );
    this.setState({
      newText: ""
    });
  }

  handleAddSuggestion(suggestion){
    this.props.onNewUserMessage(
      this.state.conversation._id,
      suggestion,
    );
  }

  componentDidUpdate() {
    api
      .getConversationbyId(this.props.match.params.conversationId)
      .then(conversation => {
        this.setState({
          conversation: conversation
        });
      })
      .catch(err => console.log(err));
  }


  componentDidMount() {
    api
      .getConversationbyId(this.props.match.params.conversationId)
      .then(conversation => {
        this.setState({
          conversation: conversation,
          lastMessageAuthor: conversation._messages[conversation._messages.length-1]._creator,
        })
      })
      .catch(err => console.log(err));
  
  }

  render() {

    let navbarClassName 
    if (this.props.location.pathname === "/") {
      navbarClassName = "d-none"
    }
    else {
      navbarClassName = "d-sm-block d-md-none"
    }
  
    return (
      <div className="Chat">
        
        <Navbar color="light" light expand="xs" className={navbarClassName}>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink to="/" tag={Link}><h1>NeoChat</h1></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><span>{this.state.conversation.title}</span></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        {/* <div className=" conversationTitle">
          <p>{this.state.conversation.title}</p>
        </div> */}
        <form className="mx-5">
          <div className="form-row mt-3">
            <div className="col-lg-10">
              <input
                type="textarea"
                placeholder="what do you want to talk about?"
                className="chatInput form-control"
                onChange={e => this.handleInputChange(e)}
                value={this.state.newText}
              />
            </div>
            <div className="col-lg-2">
              <Button
                className="form-control btn-block mt-2"
                onClick={e => this.handleUpdateConversation(e)}
              >
                Send
              </Button>
            </div>
          </div>
        </form>

        <div className="MessageList">
          {this.state.conversation._messages !== undefined
            ? this.state.conversation._messages
                .slice(0)
                .reverse()
                .map((message, i) => (
                  <Message message={message} key={message._id} />
                ))
            : null}
        </div>
      </div>
    );
  }
}

export default Chat;
