import React, { Component } from "react";
class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      plants: plantData,
    };
  }

  render() {
    console.log(this.state.plants);
    return <div>Plant Page</div>;
  }
}

export default Plant;
