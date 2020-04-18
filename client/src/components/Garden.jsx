import React, { Component } from "react";
import PlantCard from "./PlantCard";
import styles from "../styles/cards.css";
import plantData from "../dummy_plants.json";
import { Button } from "react-bootstrap";

class Garden extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
    };
  }
  componentDidMount() {
    this.setState({
      plants: this.props.plantData || plantData,
    });
  }
  render() {
    let allPlants = this.state.plants.map((plant) => {
      return (
        <div style={{ padding: "20px" }}>
          <PlantCard plant={plant} />
        </div>
      );
    });
    console.log(this.state.plants);
    return (
      <div style={{ margin: "20px" }}>
        <div style={{ textAlign: "right" }}>
          <Button
            variant="primary"
            size="lg"
            style={{ backgroundColor: "#22b550", marginRight: "60px" }}
          >
            Add A Plant
          </Button>
        </div>
        <div className="card-container-outer">
          <div className="card-container">{allPlants}</div>
        </div>
      </div>
    );
  }
}

export default Garden;
