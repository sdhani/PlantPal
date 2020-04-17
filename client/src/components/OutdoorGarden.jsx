import React, { Component } from "react";
import Garden from "./Garden";
import plantData from "../dummy_plants.json";

class OutdoorGarden extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Outdoor Garden</h1>
        <Garden plantData={plantData} />
      </div>
    );
  }
}

export default OutdoorGarden;
