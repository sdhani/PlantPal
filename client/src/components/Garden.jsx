import React, { Component } from "react";
import plantData from "../dummy_plants.json";
class Garden extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      plants: plantData,
    };
  }

  render() {
    console.log(this.state.plants);
    return (
      <div>
        <h1>Garden page</h1>
      </div>
    );
  }
}

export default Garden;
