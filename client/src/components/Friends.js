import React, { Component } from "react";
import api from "../api";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      friends: []
    };
  }

  // handleClick(){
  //   api.addFriend(this.state.users[0]._id)
  // }
  handleAddFriend(e) {
    e.preventDefault(); 
    console.log("handleaddfriend",e.target.value);
    api.addFriend("5b48b0bc7aedbdf4bbf40d4c");
    }

  componentDidMount() {
    api
      .getFriends()
      .then(friends => {
        console.log("friends", friends);
        this.setState({
          friends: friends
        });
      })
      .catch(err => console.log(err));

    api.getUsers().then(users => {
      console.log("users", users);

      this.setState({
        users: users
      });
    });

    api
      .getUserbyId("5b48b0bc7aedbdf4bbf40d4b")
      .then(user => {
        console.log("user", user);
      })

      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="Users">
        <h2>List of Users</h2>
        {this.state.users.map((c, i) => <li key={i}>{c.name}</li>)}

    
        {this.state.friends.length > 0 &&  <h2>List of Friends</h2>}
        {this.state.friends.length > 0 && this.state.friends.map((c, i) => <li key={i}>{c.name}</li>)}
        
        <h2>Add a Friend</h2>

        <form>
          <select name="users">
          {this.state.users.map((u, i) =><option value={u._id} key={u._id}>{u.name}</option>)}
          </select>
          <input type="submit" value="Add Friend" onClick={e => this.handleAddFriend(e)}/>
        </form>

      </div>
    );
  }
}

export default Friends;
