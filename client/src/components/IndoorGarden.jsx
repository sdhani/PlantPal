import React, { Component } from "react";
import Garden from "./Garden";
import plantData from "../dummy_plants.json";

class IndoorGarden extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Indoor Garden</h1>
        <Garden plantData={plantData} />
      </div>
    );
  }
}

export default IndoorGarden;
