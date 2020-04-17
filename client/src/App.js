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

function App() {
  return (
    <div>
      <Router>
        <MyNav />
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/allusers" component={Homepage} />
        <Route exact path="/garden" component={Garden} />
        <Route exact path="/outdoorgarden" component={OutdoorGarden} />
        <Route exact path="/indoorgarden" component={IndoorGarden} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/plant/:id" component={Plant} />
      </Router>
    </div>
  );
}

export default App;
