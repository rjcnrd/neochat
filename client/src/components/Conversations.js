import React, { Component } from "react";
import api from "../api";
import Chat from './Chat';
import { Link, Route } from 'react-router-dom';
import { Button, Label, Input, Row, Col, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';



class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      addConversationVisible: "",
      users:[],
      newConversationName: "",
      newConversationPartner:"",
    
    };
    console.log("Conversation constructor")

  }

  // handleEditConversation(e) {
  //   e.preventDefault();
  //   console.log("handle edit conversation");
  //   api.editConversationbyId("5b4c644f843e6a1d2a554c10", { design: "Blu" });
  // }

  handleNewUserMessage(conversationId, newText) {

    if (newText.trim() === "")
      return;
    
    api.addMessage(conversationId,
      {
        text: newText,
        imgUrl: null,
        _creator: api.loadUser().id,
      }
    )
    .then(()=>{
      console.log("created message in handleNewUserMessage")
      api.getGiphy(newText)
      .then(arrayOfGifs => {
       console.log(arrayOfGifs.data[0].images.fixed_width.url,"arrayOfGifs.data[0].images.fixed_width.url");
       return arrayOfGifs.data[0].images.fixed_width.url;
      })
      .catch(err => console.log(err))
      .then(gifUrl =>{
        console.log("GIF URL",gifUrl)
        if (gifUrl)
          api.addMessage(conversationId,
            { 
              text: null,
              imgUrl: gifUrl,
              _creator: api.loadUser().id,
            }
        )
        console.log("created a cat gif message")
      }) 
      
        api
        .getUserConversations(api.loadUser().id)
        .then(conversations => {
          this.setState({
            conversations: conversations,
          });
        })
        .catch(err => console.log(err));
      
      console.log("handleNewUserMessage, message created", conversationId, newText);
      console.log("new conversation state", this.state.conversations);
    })
  }

  displayAddConversation(){
    this.setState({
      addConversationVisible: true,
    });
  }

  handleNameOfConversation(e)
  {
    this.setState({
      newConversationName: e.target.value,
    })
    console.log("conversation name", this.state.newConversationName)
  }

  handleConversationPartner(e){
    this.setState({
      newConversationPartner: e.target.value,
    })
    console.log("userId of the conversation partner",e.target.value)
  }

  handleAddConversation(){
    api.addConversation({
      _participants:[this.state.newConversationPartner,api.loadUser().id],
      title: this.state.newConversationName
    })
    .then(()=>{console.log(" handleAddConversation passiert")})
    .then(()=>{
      api
      .getUserConversations(api.loadUser().id)
      .then(conversations => {
        this.setState({
          conversations: conversations,
          addConversationVisible: false,
        });
      })
      .catch(err => console.log(err));
    })
  }

  handleLogoutClick(e) {
    api.logout()
  }


  componentDidMount() {
    api
      .getConversations()
      .then(conversations => {
        this.setState({
          conversations: conversations,
          addConversationVisible: false,
        });
      })
      .catch(err => console.log(err));

    api
    .getUsers()
    .then(users => {
      this.setState({
        users: users,
      });
    })
    .catch(err => console.log(err));
  }


  render() {

    let navbarClassName 
    let leftColClassName
    
    if (this.props.location.pathname === "/") {
      navbarClassName = "d-none"
      leftColClassName = "col-12 messagePreview"
    }
    else {
      navbarClassName = "d-sm-block d-md-none"
      leftColClassName = "col-4 messagePreview d-none d-md-block"
    }
    return (
//Left side - preview of all conversations 
      <div className="Conversations">
        {/* <Navbar color="light" light expand="xs" className={navbarClassName}>
          <NavbarBrand to="/" tag={Link}>NeoChat</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink >GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar> */}

        <Row>
        <div className={leftColClassName} >
            <Link to={`/`}><h1>Chats</h1></Link>
            {api.loadUser().name ? <p className="userName"> of {api.loadUser().name}</p> : null }
            {this.state.conversations.map((conversation,i) =>   
            <Link to={`/conversations/${conversation._id}`} key={conversation._id}><div className="conversationNames"><p>{conversation.title}</p></div></Link>
            )}

          <Button color="primary" onClick={e => this.displayAddConversation(e)}>Add Conversation</Button>
          
            {this.state.addConversationVisible && 
            
            <div>
              <Label for="exampleSelect">Select Friend</Label>
              <Input type="select" name="users" id="exampleSelect" onChange={(e) => this.handleConversationPartner(e)}>
              {this.state.users.map((u, i) =><option value={u._id} key={u._id}>{u.name}</option>)}
              </Input>
              <Input type="email" name="email" placeholder="Chat Name" onChange={(e) => this.handleNameOfConversation(e)} />
              {/* <input type="textarea" placeholder="What do you want to talk about?" onChange={(e) => this.handleNameOfConversation(e)}/> */}
              
              <Button color="primary"onClick={() => this.handleAddConversation()}>Let's talk</Button>
           
           
            </div>
            }
            <div>
          {api.isLoggedIn() &&  <Link to="/" onClick={(e) => this.handleLogoutClick(e)}><img alt="byeseal" height="50px" src="https://media.giphy.com/media/AmDzMmCJZABsk/giphy.gif"/></Link> }
          </div>
        

        </div>

       <div className="col-md-8 pt-0 messageDetails">

         <Route path="/conversations/:conversationId" 
          render={props => <Chat {...props} onNewUserMessage={this.handleNewUserMessage.bind(this)} />} 
        />
        </div>
        </Row>
        
       </div>
   


    );
  
  }
}


export default Conversations;
