import React, { Component } from "react";
import PlantCard from "./PlantCard";
import styles from "../styles/cards.css";
import plantData from "../dummy_plants.json";

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
      <div>
        <div className="card-container-outer">
          <div className="card-container">{allPlants}</div>
        </div>
      </div>
    );
  }
}

export default Garden;
