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
      if (typeof plant[key] === "object") {
        return <li>{key}</li>;
      } else {
        return (
          <div style={{ fontSize: "25px" }}>
            {key} : {plant[key]}
          </div>
        );
      }
    });
    const {
      plant_id,
      trefle_id,
      common_name,
      scientific_name,
      duration,
      family_common_name,
    } = plant;
    return (
      <div style={{ margin: 50 }}>
        <h1>{plant.common_name}</h1>
        <img src={plant.images.url} style={{ width: "400px" }}></img>
        <ul>{plantData}</ul>
        <div>{JSON.stringify(plant)}</div>
      </div>
    );
  }
}

export default Plant;
