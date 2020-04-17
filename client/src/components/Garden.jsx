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
    return <div>Garden page</div>;
  }
}

export default Garden;
