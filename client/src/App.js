import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage'

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  // state = {cities: []}
  
  // async componentDidMount() {
  //   const response = await fetch('/cities')
  //   const cities   = await response.json()
  //   this.setState({cities: cities})
  // }
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component = {Homepage} />
        </Router>

        {/* <ul>
          {this.state.cities.map( city => {
            return <li key={city.name}> <b>{city.name}</b>: {city.population}</li>
          })}
        </ul> */}
      </div>
    );
  }
}
export default App;