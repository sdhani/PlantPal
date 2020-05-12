import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
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

class PlantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_gardens: this.props.all_gardens,
      garden_id: this.props.garden_id,
    };
  }
  componentDidMount() {
    this.setState({ last_watered: new Date() });
    if (!this.state.all_gardens) {
      fetchGarden().then((data) => this.setState({ all_gardens: data }));
    }
    const options = this.state.all_gardens.map((option) => {
      const { garden_name, id } = option;
      return { label: garden_name, value: id };
    });
    this.setState({ options });

    // const { id, common_name, last_watered, outdoor_plant } = this.props.plant;
    // console.log("id stuff", id);
    const { id } = this.props.plant;
    getPlant(id).then((data) =>
      this.setState({ plant: data }, () => {
        console.log(data);
      })
    );
  }
  handleUpdatedGarden = async (value) => {
    console.log(value);
    this.setState({ updateGardenId: value.value });
  };

  deletePlant = async () => {
    const { id } = this.props.plant;
    deletePlant(id).then((data) => {
      return this.props.refresh && this.props.refresh();
    });
  };

  editPlant = async (e, id) => {
    e.preventDefault();
    const updates = {
      garden_id: this.state.updateGardenId,
      outdoor_plant: this.state.updatedOutdoor === "outdoor",
      last_watered: "2020-04-21",
    };
    editPlant(id, updates).then((data) =>
      console.log("edited plant", id, updates, data)
    );
  };
  markAsWatered = async (id) => {
    const updates = {
      last_watered: "2020-04-21",
    };
    editPlant(id, updates).then((data) => console.log("edited plant", data));
  };
  inputHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleDateChange = (date) => {
    this.setState({ last_watered: date });
  };

  render() {
    const { id, name, common_name, last_watered, outdoor_plant } =
      this.state.plant || this.props.plant;

    const img =
      this.props.plant.images && this.props.plant.images.url
        ? this.props.plant.images.url
        : undefined;
    const plant = this.state || { ...this.props.plant };

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
              selected={this.state.last_watered}
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
    return (
      <Card
        style={{
          width: "18rem",
          height: this.props.height || "370px",
          width: this.props.width || "280px",
          margin: "5px",
          color: "#0a3618",
          borderColor: "#006b28",
          borderWidth: ".5px",
          borderBottom: "5px solid #22b550",
        }}
        className="cardbox"
      >
        <Card.Img variant="top" src={img} style={{ height: "45%" }} />
        <Card.Body>
          <Card.Title>{name ? name : common_name}</Card.Title>
          {!this.props.preview && (
            <div>
              <Card.Subtitle className="mb-2 text-muted">
                {common_name}
              </Card.Subtitle>
              <Card.Text>
                {outdoor_plant ? "Outdoor Plant" : "Indoor plant"}
                <br />
                Last watered {last_watered || Date.now()}
              </Card.Text>
              <Link to={{ pathname: `/plant/${id}`, state: { plant } }}>
                <Button
                  variant="secondary"
                  style={{ backgroundColor: "#006b28", marginRight: "5px" }}
                >
                  View
                </Button>
              </Link>
              <Modal
                form={editPlantForm}
                label={"Edit"}
                title={`Edit Plant`}
                refresh={this.props.refresh}
                style={{ backgroundColor: "#db5c58" }}
                variant="secondary"
                buttonStyles={{
                  backgroundColor: "#bfe046",
                  marginRight: "5px",
                }}
              />
              <Button
                variant="secondary"
                style={{ backgroundColor: "#db5c58" }}
                onClick={this.deletePlant}
              >
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default PlantCard;
