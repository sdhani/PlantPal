import React, { Component } from "react";

class Homepage extends Component{
  state = {users: []}

  async componentDidMount() {
    const response = await fetch('/users')
    const users   = await response.json()
    console.log("Dummy Data Output", users)
    this.setState({users: users})
  }

  render(){
    return(
      <div>
        <ul>
          {this.state.users.map(users => {
            return <li key={users.id}>{users.username}</li>
          })}
        </ul>
      </div>
        
    )
  }
}

export default Homepage;