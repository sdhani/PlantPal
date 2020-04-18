import React, { Component } from "react";
import Garden from "./Garden";
import plantData from "../dummy_plants.json";

/**
 *
 * OUTDOOR:
 * uses dummy data now but
 * should query outdoor plants only and display
 */
class OutdoorGarden extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
          Outdoor Garden
        </h1>
        <Garden plantData={plantData} />
      </div>
    );
  }
}

export default OutdoorGarden;
