import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Account from './components/Account';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>PlantPal</h1>
      <Account />
      <Router>
        <Route exact path="/allusers" component = {Homepage} />
      </Router>
    </div>
  );
}

export default App;