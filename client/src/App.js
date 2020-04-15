import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Account from './components/Account';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      registerFormData: {
        email: '',
        username: '',
        password: ''
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

  render(){
    return (
      <div>
        <h1>PlantPal</h1>
        <Account 
          registerFormData={this.state.registerFormData}
          handleRegisterChange={this.handleRegisterChange}
        />
        <Router>
          <Route exact path="/allusers" component = {Homepage} />
        </Router>
      </div>
    );
  }
  
}

export default App;