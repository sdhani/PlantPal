import React, { Component } from "react";
import PlantCard from "./PlantCard";
import styles from "../styles/cards.css";
import plantData from "../dummy_plants.json";
import {
  addPlant,
  getAllPlants,
  searchPlantName,
} from "../../src/services/api.js";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import { verifyToken } from "../services/api";
import AsyncCreatable from "react-select/async-creatable";
import Select from "react-select";

class Garden extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      sorted: [],
      sortedByCat: [],
      categories: [],
      options: [],
    };
  }
  componentDidMount() {
    this.setState({ ...this.props.location.state.garden });
    getAllPlants().then((data) =>
      this.setState({ plants: data, sorted: data }, () => {
        let categories = new Set();
        this.state.plants.forEach((plant) => {
          categories.add(plant.family_common_name);
        });
        this.setState({ categories: Array.from(categories) }, () =>
          console.log(this.state.categories)
        );
      })
    );
    // /api/gardens/:id/plants

    // this.setState({
    //   plants: this.props.plantData || plantData,
    //   sorted: this.props.plantData || plantData,
    // }, () => {
    //   let categories = new Set()
    //   this.state.plants.forEach(plant => {
    //     categories.add(plant.family_common_name);
    //   })
    //   this.setState({ categories: Array.from(categories) }, () => console.log(this.state.categories))
    // });
  }

  refresh = () => {
    this.componentDidMount();
  };
  inputHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSearch = async (value) => {
    this.setState({ plant_family: value.label, trefle_id: value.value });
  };

  promiseOptions = (inputValue) => {
    return searchPlantName(inputValue.toLowerCase()).then((ops) => {
      const options = ops.map((option) => {
        console.log(option);
        const label = option.common_name;
        const value = option.id;
        return { label, value };
      });
      this.setState({ options });
      return options;
    });
  };

  addPlant = async (e) => {
    e.preventDefault();
    const plant = {
      garden_id: this.state.id,
      outdoor_plant: this.state.outdoor_plant === "outdoor",
      common_name: this.state.plant_family,
      user_id: this.state.user_id,
      // trefle_id:
      //   typeof this.state.trefle_id === "number"
      //     ? this.state.trefle_id
      //     : undefined,
      name: this.state.plant_name,
    };
    const added = await addPlant(plant);
    console.log("added plant", plant, added);
  };
  // ascending
  sortByName = () => {
    let sorted = this.state.plants.sort((a, b) => {
      const nameA = a.common_name.toLowerCase(),
        nameB = b.common_name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    this.setState({ sorted });
  };

  // sort by highest priority
  sortByPriority = () => {
    let sorted = this.state.plants.sort(
      (a, b) => a.last_watered - b.last_watered
    );
    this.setState({ sorted });
  };

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
    let sortedByCat = this.state.categories.map((category) => {
      let sub = this.filterByCategory(category);
      console.log(sub);
      return (
        <div>
          <h1 style={{ width: "100vw" }}>{category}</h1>
          <div className="card-container">
            {sub ? this.displayPlants(sub) : "None"}
          </div>
        </div>
      );
    });
    return sortedByCat;
  };

  displayPlants = (plants) => {
    return plants.map((plant) => {
      return (
        <div style={{ padding: "20px" }}>
          <PlantCard plant={plant} />
        </div>
      );
    });
  };

  render() {
    let allPlants = this.displayPlants(this.state.sorted);
    const addForm = (
      <div>
        <form
          className="col-md-8 mb-3"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2%",
          }}
          onSubmit={this.addPlant}
        >
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Plant Name: </label>
            <br />
            <input
              type="text"
              className="form-control form-control-lg"
              name={"plant_name"}
              onChange={this.inputHandler}
              placeholder={"Name"}
              style={{ marginBottom: "20px" }}
            />
            <label style={{ fontWeight: "bold" }}>Plant Family/Type: </label>
            <br />
            <AsyncCreatable
              defaultOptions={this.state.options}
              loadOptions={this.promiseOptions}
              onChange={(value) => this.handleSearch(value)}
            />
            {/* <input
              type="text"
              className="form-control form-control-lg"
              name={"family"}
              onChange={this.inputHandler}
              placeholder={"Family"}
              style={{ marginBottom: "20px" }}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              name={"image"}
              onChange={this.inputHandler}
              placeholder={"Image"}
              style={{ marginBottom: "20px" }}
            /> */}
            <br />
            <label style={{ fontWeight: "bold" }}>Indoor vs Outdoor: </label>
            <br />
            <input
              type="radio"
              id="outdoor"
              name="outdoor_plant"
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
              name="outdoor_plant"
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
        <h1>{this.state.garden_name}</h1>
        <div style={{ textAlign: "right" }}>
          <Modal
            form={addForm}
            label={"Add A Plant"}
            title={`Add A Plant`}
            refresh={this.refresh}
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
