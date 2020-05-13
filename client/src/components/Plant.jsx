import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { getPlant, editPlant } from "../../src/services/api.js";
import { formatDate } from "../utils/helpers";

class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { plant: {} };
  }
  componentDidMount() {
    console.log("ALL PROPS", this.props);
    // const { plant_id } = this.props.plant;
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.plant
    ) {
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
    const {
      id,
      trefle_id,
      name,
      common_name,
      scientific_name,
      duration,
      family_common_name,
      outdoor_plant,
      last_watered,
      days_until_needs_water,
    } = this.state.plant;
    let plantData = [];
    if (plant) {
      console.log("yes");
      plantData = Object.keys(plant).map((key) => {
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
        <h1 style={{ marginBottom: "20px", fontSize: "5em", color: "#006b28" }}>
          {name || common_name}
        </h1>
        <div>
          <div style={{ display: "inline-block", width: "30vw" }}>
            <img
              src={
                outdoor_plant
                  ? require("../images/stock_plant.png")
                  : require("../images/stock_indoor.jpg")
              }
              style={{ width: "500px", display: "inline-block" }}
            ></img>
          </div>

          <div
            style={{ float: "right", display: "inline-block", width: "55vw" }}
          >
            <div style={{ float: "left" }}>
              <h2
                style={{
                  marginLeft: "40px",
                  fontSize: "2.5em",
                  color: "#006b28",
                }}
              >
                Plant Information
              </h2>
              <ul style={{ listStyle: "none", fontSize: "20px" }}>
                {name && (
                  <li>
                    <strong>Name: </strong>
                    {name}
                  </li>
                )}
                <li>
                  <strong>Common Name:</strong> {common_name}
                </li>
                <li>
                  <strong>Scientific Name</strong>: {scientific_name}
                </li>
                <li>
                  <strong>Family Common Name: </strong>
                  {family_common_name}
                </li>
                <li>
                  <strong>Type:</strong>{" "}
                  {outdoor_plant ? "outdoor " : "indoor "} plant
                </li>
                <li>
                  <strong>Duration:</strong> {duration}
                </li>
              </ul>
            </div>
            <div style={{ textAlign: "left", float: "right" }}>
              <Button
                variant="primary"
                size="lg"
                style={{ backgroundColor: "green", width: "16vw" }}
                onClick={this.markAsWatered}
                id={`plant-button-${this.state.id}`}
              >
                Mark as watered
              </Button>
              <br />
              <br />
              <Button
                variant="primary"
                size="lg"
                style={{ backgroundColor: "#006b28", width: "16vw" }}
              >
                Edit Plant Information
              </Button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <h5>
            You last watered your plant on{" "}
            {new Date(last_watered).toDateString()}
          </h5>
          <h7>
            Your plant needs to be watered every {days_until_needs_water} days.
          </h7>
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default Plant;
