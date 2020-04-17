import React, { Component } from "react";
import Garden from "./Garden";
import plantData from "../dummy_plants.json";

/**
 *
 * INDOOR:
 * uses dummy data now but
 * should query indoor plants only and display
 */
class IndoorGarden extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Indoor Garden</h1>
        <Garden plantData={plantData} />
      </div>
    );
  }
}

export default IndoorGarden;
