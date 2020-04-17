import React, { Component } from "react";
class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // WOULD NEED TO MAKE TREFLE API CALL HERE TO GET MORE DATA
  }

  render() {
    const { plant } = this.props.location.state;
    let plantData = Object.keys(plant).map((key) => {
      return <li>{key}</li>;
    });
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
