import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => this.setState({ users }));
  }

  render() {
    return (
      <div>
        <h2>Homepage rendered</h2>

        <Link to="/outdoorgarden">
          <h3>Outdoor Garden</h3>
        </Link>
        <Link to="/indoorgarden">
          <h3>Indoor Garden</h3>
        </Link>
        <ul>
          {this.state.users.map((user) => {
            return (
              <li key={user.email}>
                {" "}
                <b>User:</b>
                <p>{user.email}</p>
                <p>{user.display_name}</p>
                <p>{user.weather_zipcode}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Homepage;
