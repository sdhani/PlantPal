import React, { Component } from "react";
import PlantCard from "./PlantCard";
import styles from "../styles/cards.css";
import plantData from "../dummy_plants.json";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import CreateGardenForm from "./CreateGardenForm";
import {verifyToken} from '../services/api'

class Garden extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      sorted: [],
      sortedByCat: [],
      categories: []
    };
  }
  componentDidMount() {
    console.log(this.props.plantData);
    this.setState({
      plants: this.props.plantData || plantData,
      sorted: this.props.plantData || plantData,
    }, () => {
      let categories = new Set()
      this.state.plants.forEach(plant => {
        categories.add(plant.family_common_name);
      })
      this.setState({ categories: Array.from(categories) }, () => console.log(this.state.categories))
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
  // ascending
  sortByName = () => {
    let sorted = this.state.plants.sort((a, b) => {
      const nameA = a.common_name.toLowerCase(),
        nameB = b.common_name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    this.setState({ sorted });
  }

  // sort by highest priority
  sortByPriority = () => {
    let sorted = this.state.plants.sort((a, b) => a.last_watered - b.last_watered);
    this.setState({ sorted });
  }

  filterByCategory = (category) => {
    if (category === "none") {
      this.setState({ sorted: this.state.plants });
    } else {
      let filtered = this.state.plants.filter((plant) => {
        return plant.family_common_name === category;
      });
      return filtered;
    }
  };

  sortByCategory = () => {
    let sortedByCat = this.state.categories.map(category => {
      let sub = this.filterByCategory(category);
      console.log(sub);
      return <div>
        <h1 style={{ width: "100vw" }}>{category}</h1>
        <div className="card-container">
          {sub ? this.displayPlants(sub) : "None"}
        </div>
      </div>
    })
    return sortedByCat;

  }

  displayPlants = (plants) => {
    return plants.map((plant) => {
      return (
        <div style={{ padding: "20px" }}>
          <PlantCard plant={plant} />
        </div>
      );
    });
  }


  render() {
    let allPlants = this.displayPlants(this.state.sorted);
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
        {/* <button onClick={this.sortByCategory} >Sort By category</button> */}
        <div style={{ textAlign: "right" }}>
          <Modal
            form={addForm}
            label={"Add A Plant"}
            title={`Add A Plant`}
          // refresh={this.refresh}
          />
        </div>
        {/* {this.state.sortedByCat && this.state.sortedByCat} */}
        <div className="card-container-outer">
          <div className="card-container">{allPlants}</div>
        </div>
      </div>
    );
  }
}

export default Garden;
