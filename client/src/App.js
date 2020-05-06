import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import { /*BrowserRouter as Router*/ withRouter, Route } from "react-router-dom";
import Garden from "./components/Garden";
import MyNav from "./components/MyNav";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Plant from "./components/Plant";
import OutdoorGarden from "./components/OutdoorGarden";
import IndoorGarden from "./components/IndoorGarden";
import { createUser, loginUser, verifyToken } from "./services/api"
import Gardens from "./components/Gardens";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFormData: {
        email: '',
        display_name: '',
        password: '',
        zipcode: ''
      },
      loginFormData: {
        email: '',
        password: ''
      },
      currentUser: null,
      loggedIn: false,
    }
  }

  // ******FUNCTIONS TO HANDLE REGISTER FORM******

  // tracks user input and stores it in state
  handleRegisterChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  // will submit inputted data to backend
  handleRegisterSubmit = async (ev) => {
    ev.preventDefault();
    console.log(this.state.registerFormData);
    const userinfo = await createUser(this.state.registerFormData);
    console.log(userinfo)
    this.setState({
      registerFormData: {
        email: '',
        display_name: '',
        password: '',
        zipcode: ''
      }
    });
    if (userinfo.request.status === 200) {
      this.props.history.push('/');
    }
}

  // ******FUNCTIONS TO HANDLE LOGIN FORM******

  // tracks user input and stores it in state
  handleLoginChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }

  //submits state to loginUser function
  handleLoginSubmit = async (ev) => {
    ev.preventDefault(ev);
    console.log(this.state.loginFormData)
    const userInfo = await loginUser(this.state.loginFormData);

    localStorage.setItem('jwt', userInfo.data.token);

    const user = await verifyToken();

    this.setState({
      loginFormData: {
        email: '',
        password: ''
      },
      currentUser: user[0].display_name,
      loggedIn: true
    })
    localStorage.setItem('user', this.state.currentUser)
    console.log(this.state.currentUser);
    this.props.history.push('/home')
}

  componentDidMount = () => {
    const user = localStorage.getItem('user');
    this.setState({
      currentUser: user
    })
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      currentUser: null
    })
    this.props.history.push('/')
  }

  render() {

    return (
      <div>
        {/* <Router> */}
        <MyNav
          logout={this.logout}
          currentUser={this.state.currentUser}
        />
        <Route exact path="/" render={() => (
          <Login
            loginFormData={this.state.loginFormData}
            handleLoginChange={this.handleLoginChange}
            handleLoginSubmit={this.handleLoginSubmit}
          />
        )} />
        <Route exact path="/home" render={() => (
          <Homepage
            currentUser={this.state.currentUser}

          />
        )} />
        <Route exact path="/register" render={() => (
          <Register
            registerFormData={this.state.registerFormData}
            handleRegisterChange={this.handleRegisterChange}
            handleRegisterSubmit={this.handleRegisterSubmit}
          />
        )}
        />
        <Route exact path="/allusers" component={Homepage} />
        <Route exact path="/gardens" component={Gardens} />{" "}
        {/* /garden SHOULD POTENTIALLY SHOW ALL PLANTS */}
        <Route exact path="/outdoorgarden" component={OutdoorGarden} />
        <Route exact path="/indoorgarden" component={IndoorGarden} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/plant/:id" component={Plant} />
        {/* </Router> */}
      </div>
    );
  }

}

export default withRouter(App);
