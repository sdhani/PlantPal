import React, { Component } from "react";
import PlantCard from "./PlantCard";
import styles from "../styles/cards.css";
import plantData from "../dummy_plants.json";
import {
  fetchGarden,
  addPlant,
  getAllPlantsInGarden,
  searchPlantName,
} from "../../src/services/api.js";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import { verifyToken } from "../services/api";
import AsyncCreatable from "react-select/async-creatable";
import Select from "react-select";
import { withRouter } from "react-router-dom";

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
      updates: {},
      sortByOptions: [
        { label: "None", value: "none" },
        { label: "Name", value: "name" },
        { label: "Last Watered", value: "last_watered" },
        { label: "Category", value: "Category" },
      ],
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state.garden);
      this.setState({ ...this.props.location.state.garden });
    }

    const garden_id =
      parseInt(this.props.match.params.id) ||
      this.props.location.state.garden.id;
    this.setState({ garden_id });

    if (!this.state.all_gardens) {
      fetchGarden().then((data) => this.setState({ all_gardens: data }));
    }
    getAllPlantsInGarden(garden_id).then((data) =>
      this.setState({ plants: data, sorted: data }, () => {
        let categories = new Set();
        this.state.plants.forEach((plant) => {
          categories.add(plant.common_name);
        });
        let category_options = Array.from(categories).map((cat) => {
          return { label: cat, value: cat };
        });
        category_options = [{ label: "All", value: "All" }].concat(
          category_options
        );
        this.setState(
          { category_options, categories: Array.from(categories) },
          () => console.log(this.state.categories)
        );
      })
    );
  }

  refresh = async () => {
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
      trefle_id:
        typeof this.state.trefle_id === "number"
          ? this.state.trefle_id
          : undefined,
      name: this.state.plant_name,
      daysUntilNeedsWater: this.state.daysUntilNeedsWater,
    };
    await addPlant(plant);
  };
  // ascending
  sortByName = () => {
    let sorted = this.state.plants.sort((a, b) => {
      const nameA = (a.name || a.common_name).toLowerCase(),
        nameB = (b.name || b.common_name).toLowerCase();
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
  sortByLastWatered = () => {
    let sorted = this.state.plants.sort(
      (a, b) => new Date(b.last_watered) - new Date(a.last_watered)
    );
    this.setState({ sorted });
  };

  filterByCategory = (category) => {
    if (category === "All") {
      this.setState({ sorted: this.state.plants });
    } else {
      let filtered = this.state.plants.filter((plant) => {
        return plant.common_name === category;
      });
      this.setState({ sorted: filtered });
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
    this.setState({ sortedByCat });
    return sortedByCat;
  };

  handleCategorySelect = async (value) => {
    this.setState({ category_selected: value.value }, () => {
      this.filterByCategory(value.value);
    });
  };
  handleSortSelect = async (value) => {
    let v = value.value;
    if (v === "name") {
      this.sortByName();
    } else if (v === "last_watered") {
      this.sortByLastWatered();
    } else if (v === "category") {
      this.sortByCategory();
    } else {
      this.setState({ sorted: this.state.plants });
    }
  };

  displayPlants = (plants) => {
    return plants.map((plant) => {
      return (
        <div style={{ padding: "20px" }}>
          <PlantCard
            plant={plant}
            refresh={this.refresh}
            all_gardens={this.state.all_gardens}
            garden_id={this.state.id}
          />
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

            <label style={{ fontWeight: "bold" }}>
              Days until plant needs to be watered:{" "}
            </label>
            <br />
            <input
              type="number"
              className="form-control form-control-lg"
              name={"daysUntilNeedsWater"}
              onChange={this.inputHandler}
              placeholder={"Days"}
              pattern="[0-9]*"
              defaultValue={0}
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
        <h1 style={{ textAlign: "center" }}>{this.state.garden_name}</h1>
        <br />
        <div>
          <div
            style={{
              width: "300px",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            <Select
              options={this.state.sortByOptions}
              onChange={(value) => {
                this.handleSortSelect(value);
              }}
              placeholder="Sort By..."
            />
          </div>
          <div style={{ width: "300px", display: "inline-block" }}>
            <Select
              options={this.state.category_options}
              onChange={(value) => {
                this.handleCategorySelect(value);
              }}
              placeholder="Select category..."
            />
          </div>
          <div style={{ float: "right", display: "inline-block" }}>
            <Modal
              form={addForm}
              label={"Add A Plant"}
              title={`Add A Plant`}
              refresh={this.refresh}
            />
          </div>
        </div>

        {this.state.sortedByCat && this.state.sortedByCat}
        <div className="card-container-outer" style={{ width: "100vw" }}>
          <div className="card-container">{allPlants}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Garden);
