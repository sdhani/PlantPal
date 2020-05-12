import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { getPlant } from "../../src/services/api.js";

class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // WOULD NEED TO MAKE TREFLE API CALL HERE TO GET MORE DATA
    console.log("ALL PROPS", this.props);
    // const { plant_id } = this.props.plant;
    const id =
      parseInt(this.props.match.params.id) ||
      this.props.location.state.plant.id;
    getPlant(id).then((data) => {
      console.log("in", data);
      const plant = data.find((plant) => plant.id === id);
      console.log(plant);
      this.setState({ plant });
    });
  }

  render() {
    console.log("state plant", this.state.plant);
    const { plant } = this.state;
    const plantData = [];
    if (plant) {
      const {
        id,
        trefle_id,
        common_name,
        scientific_name,
        duration,
        family_common_name,
        outdoor_plant,
        last_watered,
      } = this.state.plant;
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
    }
    return plant ? (
      <div style={{ margin: 50 }}>
        <h1>{plant.common_name}</h1>
        <img src={undefined} style={{ width: "400px" }}></img>
        <div style={{ textAlign: "right" }}>
          <Button
            variant="primary"
            size="lg"
            style={{ backgroundColor: "#006b28" }}
          >
            Edit Plant
          </Button>
          <br />
          <br />
          <Button
            variant="primary"
            size="lg"
            style={{ backgroundColor: "#006b28" }}
          >
            Delete Plant
          </Button>
        </div>

        <ul>{plantData}</ul>
        <div>{JSON.stringify(plant)}</div>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default Plant;
