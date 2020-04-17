import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "../styles/login.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      invalid: false,
    };
  }
  onSubmit = (e) => {
    console.log("create user");
    // e.preventDefault();
    // axios
    //   .post("/api/users/create", {
    //     ...this.state,
    //   })
    //   .then((data) => {
    //     console.log(data);
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
        <h1 style={{ textAlign: "center" }}>PlantPal</h1>
        {this.state.invalid ? (
          <h5
            style={{
              padding: "15px",
              backgroundColor: "#ed8282",
              color: "white",
              opacity: "85%",
            }}
          >
            This user already exists.
          </h5>
        ) : (
          <div />
        )}
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              required
              placeholder="name"
              name="name"
              onChange={this.inputHandler}
            />
            <input
              type="text"
              required
              placeholder="email address"
              name="email"
              onChange={this.inputHandler}
            />
            <input
              type="password"
              required
              placeholder="password"
              name="password"
              onChange={this.inputHandler}
            />

            <Link to="/home">
              <button>create</button>
            </Link>

            <Link to="/">
              <p className="message">Already registered?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
