import React, { Component } from "react";
class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { plant } = this.props.location.state;
    console.log(Object.keys(plant));
    let plantData = Object.keys(plant).map((key) => {
      return <div>{key},</div>;
    });
    console.log(this.props.location.state.plant);
    return (
      <div>
        <h1>Plant Page</h1>
        <ul>{plantData}</ul>
        <div>{JSON.stringify(plant)}</div>
      </div>
    );
  }
}

export default Plant;
