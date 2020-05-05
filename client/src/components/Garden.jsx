import React, { Component } from "react";
import PlantCard from "./PlantCard";
import styles from "../styles/cards.css";
import plantData from "../dummy_plants.json";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import CreateGardenForm from "./CreateGardenForm";

class Garden extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
    };
  }
  componentDidMount() {
    // window.location.reload(false);
    this.setState({
      plants: this.props.plantData || plantData,
    });
  }

  inputHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  addPlant = (e) => {
    e.preventDefault();
    console.log("added plant");
  };

  render() {
    let allPlants = this.state.plants.map((plant) => {
      return (
        <div style={{ padding: "20px" }}>
          <PlantCard plant={plant} />
        </div>
      );
    });
    console.log(this.state.plants);

    const addForm = (
      <div>
        <form
          className="col-md-4 mb-3"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2%",
          }}
          onSubmit={this.addPlant}
        >
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Add Plant</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name={"name"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
              placeholder={"Name"}
              style={{ marginBottom: "20px" }}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              name={"family"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
              placeholder={"Family"}
              style={{ marginBottom: "20px" }}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              name={"image"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
              placeholder={"Image"}
              style={{ marginBottom: "20px" }}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add plant"
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(46, 202, 95)" }}
            />
          </div>
        </form>
      </div>
    );
    return (
      <div style={{ margin: "20px" }}>
        <div style={{ textAlign: "right" }}>
          <Modal
            form={addForm}
            label={"Add A Plant"}
            title={`Add A Plant`}
            // refresh={this.refresh}
          />
        </div>
        <div className="card-container-outer">
          <div className="card-container">{allPlants}</div>
        </div>
        <CreateGardenForm />
      </div>
    );
  }
}

export default Garden;
