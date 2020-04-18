import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "../styles/login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      invalid: false,
    };
  }
  onSubmit = (e) => {
    console.log("logging in");
    // e.preventDefault();
    // axios
    //   .put("/api/auth/login", {
    //     ...this.state,
    //   })
    //   .then((res) => res.data)
    //   .then((user) => {
    //     this.setState({ invalid: false });
    //     this.props.history.replace(`/home/`);
    //   })
    //   .catch((e) => {
    //     this.setState({ invalid: true });
    //     console.log(e);
    //   });
  };
  inputHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="login-page">
        <h1 style={{ textAlign: "center", color: "#22b550" }}>Plant Pal</h1>
        {this.state.invalid ? (
          <h5
            style={{
              padding: "15px",
              backgroundColor: "#ed8282",
              color: "white",
              opacity: "85%",
            }}
          >
            Invalid Username or Login
          </h5>
        ) : (
          <div />
        )}
        <div className="form" id="lform">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              onChange={this.inputHandler}
            />
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              onChange={this.inputHandler}
            />
            <Link to="/home">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <p className="message">Not registered?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
