import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Garden from "./components/Garden";
import MyNav from "./components/MyNav";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Plant from "./components/Plant";
import OutdoorGarden from "./components/OutdoorGarden";
import IndoorGarden from "./components/IndoorGarden";
import {createUser, loginUser} from "./services/api"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      registerFormData: {
        email: '',
        username: '',
        password: '',
        zipcode: ''
      }
    }
  }

// ******FUNCTIONS TO HANDLE REGISTER FORM******
  
// tracks user input and stores it in state
  handleRegisterChange = (ev) => {
    const {name, value} = ev.target;
    this.setState(prevState =>({
      registerFormData: {
        ...prevState.registerFormData,
        [name]:value
      }
    }));
  }

// will submit inputted data to backend
  handleRegisterSubmit = (ev) => {
    ev.preventDefault();
    console.log(this.state.registerFormData);
    await createUser(this.state.registerFormData);
    this.setState({
      registerFormData: {
        email: '',
        username: '',
        password: '',
        zipcode: ''
      }
    });
    this.props.history.push('/home');
  }

  render(){
    return (
      <div>
        <Router>
          <MyNav />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/register" render={()=>(
            <Register 
              registerFormData={this.state.registerFormData}
              handleRegisterChange={this.handleRegisterChange}
              handleRegisterSubmit={this.handleRegisterSubmit}
            />
          )}   
          />
          <Route exact path="/allusers" component={Homepage} />
          <Route exact path="/garden" component={Garden} />{" "}
          {/* /garden SHOULD POTENTIALLY SHOW ALL PLANTS */}
          <Route exact path="/outdoorgarden" component={OutdoorGarden} />
          <Route exact path="/indoorgarden" component={IndoorGarden} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/plant/:id" component={Plant} />
        </Router>
      </div>
    );
  }

}

export default App;
