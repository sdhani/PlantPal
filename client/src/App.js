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
import CreateGardenForm from './components/CreateGardenForm'

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
    const userInfo = await createUser(this.state.registerFormData);
    this.setState({
      registerFormData: {
        email: '',
        display_name: '',
        password: '',
        zipcode: ''
      }
    });
    //reroute user to login if registration successfull
    if (userInfo.request.status === 200) {
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
    const userInfo = await loginUser(this.state.loginFormData);
    console.log(userInfo)
    localStorage.setItem('jwt', userInfo.data.token);

    this.setState({
      loginFormData: {
        email: '',
        password: ''
      },
      loggedIn: true
    })
    //reroutes user to home page if login successful
    if (userInfo.request.status === 200) {
      this.props.history.push('/home');
    }
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
        <Route exact path="/gardens" component={Gardens} />
        <Route exact path="/garden/:id" component={Garden} />
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
