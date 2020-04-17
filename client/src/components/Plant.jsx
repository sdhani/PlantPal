import React, { Component } from "react";
class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.state.plants);
    return (
      <div>
        <h1>Plant Page</h1>
      </div>
    );
  }
}

export default Plant;
