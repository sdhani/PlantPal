import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { getPlant, editPlant } from "../../src/services/api.js";
import { formatDate } from "../utils/helpers";

class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("ALL PROPS", this.props);
    // const { plant_id } = this.props.plant;
    if (this.props.location && this.props.location.state.plant) {
      this.setState({ plant: this.props.location.state.plant });
    } else {
      const id =
        parseInt(this.props.match.params.id) ||
        this.props.location.state.plant.id;
      getPlant(id).then((data) => {
        console.log(data);
        this.setState({ plant: data });
      });
    }
  }

  markAsWatered = async () => {
    const { id } = this.state.plant;
    let d = new Date(Date.now());
    const updates = {
      garden_id: this.state.plant.garden_id,
      outdoor_plant: this.state.plant.outdoor === "outdoor",
      last_watered: formatDate(d),
    };
    editPlant(id, updates).then((data) => {
      console.log(updates, data);
      this.componentDidMount();
    });
  };

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
            variant="secondary"
            style={{ backgroundColor: "green" }}
            onClick={this.markAsWatered}
            id={`plant-button-${this.state.id}`}
          >
            Mark as watered
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
