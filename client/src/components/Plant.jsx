import React, { Component } from "react";
import { Button } from "react-bootstrap";
import {
  formatDate,
  getDateDifference,
  getDateNeedsWater,
} from "../utils/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchGarden,
  getPlant,
  deletePlant,
  editPlant,
} from "../../src/services/api.js";
import Select from "react-select";
import Modal from "./Modal";

class Plant extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { plant: {}, all_gardens: [], options: [] };
  }
  componentDidMount() {
    console.log("ALL PROPS", this.props);
    // const { plant_id } = this.props.plant;
    // if (
    //   this.props.location &&
    //   this.props.location.state &&
    //   this.props.location.state.plant
    // ) {
    //   this.setState({
    //     plant: this.props.location.state.plant,
    //     garden_id: this.props.location.state.plant.garden_id,
    //   });
    // } else {
    const id =
      parseInt(this.props.match.params.id) ||
      this.props.location.state.plant.id;
    getPlant(id).then((data) => {
      console.log(data);
      this.setState({
        plant: data,
        garden_id: data.garden_id,
        updateGardenId: data.garden_id,
      });
    });
    // }
    fetchGarden().then((data) =>
      this.setState({ all_gardens: data }, () => {
        console.log("ALL GARDENS", this.state.all_gardens);
        const options = this.state.all_gardens.map((option) => {
          const { garden_name, id } = option;
          return { label: garden_name, value: id };
        });
        this.setState({ options }, () => {
          const garden_name = this.state.options.find(
            (g) => (g.value = this.state.garden_id)
          );
          console.log("gname", garden_name);
          this.setState({ garden_name: garden_name && garden_name.label });
        });
      })
    );
  }

  refresh = () => {
    getPlant(this.state.plant.id).then((data) => {
      console.log(data);
      this.setState({ plant: data, garden_id: data.garden_id });
    });
  };
  handleDateChange = (date) => {
    this.setState({ last_watered_updated: date });
  };
  editPlant = async (e, id) => {
    e.preventDefault();
    const updates = {
      garden_id: this.state.updateGardenId,
      outdoor_plant: this.state.plant.outdoor_plant,
      last_watered: formatDate(this.state.last_watered_updated),
    };
    editPlant(id, updates).then((data) =>
      console.log("edited plant", id, updates, data)
    );
  };
  handleUpdatedGarden = async (value) => {
    this.setState({ updateGardenId: value.value });
  };

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
    const { plant, garden_name } = this.state;
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

    const dateNeedsWater = getDateNeedsWater(
      last_watered,
      days_until_needs_water
    );
    const daysLeft = getDateDifference(new Date(Date.now()), dateNeedsWater);
    const editPlantForm = (
      <div>
        <form
          className="col-md-8 mb-3"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2%",
          }}
          onSubmit={(e) => this.editPlant(e, id)}
        >
          <div className="form-group">
            <label style={{ fontWeight: "bold", paddingRight: "5px" }}>
              Last Watered:{" "}
            </label>
            <br />

            <DatePicker
              selected={this.state.last_watered_updated}
              onChange={this.handleDateChange}
            />
            <br />
            <br />
            <label style={{ fontWeight: "bold" }}>Garden Name: </label>
            <Select
              options={this.state.options}
              onChange={(value) => {
                this.handleUpdatedGarden(value);
              }}
              defaultValue={
                this.state.options &&
                this.state.options.find((g) => (g.value = this.state.garden_id))
              }
            />
            <br />
            <label style={{ fontWeight: "bold" }}>Indoor vs Outdoor: </label>
            <br />
            <input
              type="radio"
              id="outdoor"
              name="updatedOutdoor"
              value="outdoor"
              onChange={this.inputHandler}
            />
            <label for="outdoor" style={{ padding: "5px" }}>
              {" "}
              Outdoor Plant
            </label>
            <br />
            <input
              type="radio"
              id="indoor"
              name="updatedOutdoor"
              value="indoor"
              onChange={this.inputHandler}
            />
            <label for="indoor" style={{ padding: "5px" }}>
              Indoor Plant
            </label>
            <br />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit plant"
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(46, 202, 95)" }}
            />
          </div>
        </form>
      </div>
    );
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
            style={{
              float: "right",
              display: "inline-block",
              width: "55vw",
            }}
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
                  <strong>Garden:</strong> {garden_name}
                </li>
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
                <br />
                <li>
                  <strong>Next Watering Date:</strong>{" "}
                  {dateNeedsWater.toDateString()}
                </li>
                <li>
                  <strong>Days Left Until Needs Water:</strong>{" "}
                  {daysLeft > 0 ? daysLeft : 0}
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
              {/* <Button
                variant="primary"
                size="lg"
                style={{ backgroundColor: "#006b28", width: "16vw" }}
              >
                Edit Plant Information
              </Button> */}
              <Modal
                form={editPlantForm}
                label={"Edit Plant Information"}
                title={`Edit Plant`}
                refresh={this.refresh}
                style={{ backgroundColor: "#db5c58" }}
                variant="primary"
                buttonStyles={{
                  backgroundColor: "#bfe046",
                  fontSize: "1.2em",
                  width: "16vw",
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          {daysLeft < 0 && (
            <h5 style={{ color: "red" }}>
              You should have watered your plant {Math.abs(daysLeft)} days ago.
            </h5>
          )}
          <h7>
            You last watered your plant on{" "}
            {new Date(last_watered).toDateString()}
          </h7>
          <br />
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
