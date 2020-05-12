import React, { Component } from "react";
import axios from "axios";
import {
  createGarden,
  fetchGarden,
  deleteGarden,
  editGarden,
} from "../../src/services/api.js";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Modal from "./Modal";
import CreateGardenForm from "./CreateGardenForm.jsx";
import styles from "../styles/cards.css";

class Gardens extends Component {
  state = { all_gardens: [] };
  componentDidMount() {
    fetchGarden().then((data) => this.setState({ all_gardens: data }));
  }
  addGarden = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const garden_name = await createGarden({
          garden_name: this.state.name,
        });
        console.log(garden_name);
      } catch (e) {
        console.log(e);
      }
    }
  };
  refresh = () => {
    fetchGarden().then((data) => this.setState({ all_gardens: data }));
  };
  deleteGarden = async (id) => {
    deleteGarden(id).then((data) => {
      this.refresh();
    });
  };
  editGarden = async (e, id, editedName) => {
    e.preventDefault();
    editGarden(id, editedName).then((data) => console.log("edited"));
  };
  inputHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  displayGardens = (gardens) => {
    const display = gardens.map((garden) => {
      console.log(garden);
      const { id, garden_name } = garden;
      const editGardenForm = (
        <div>
          <form
            className="col-md-4 mb-3"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "2%",
            }}
            onSubmit={(e) => this.editGarden(e, id, this.state.editedName)}
          >
            <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Garden Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name={"editedName"}
                onChange={this.inputHandler}
                placeholder={"Name"}
                style={{ marginBottom: "20px" }}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Edit Garden"
                className="btn btn-primary"
                style={{ backgroundColor: "rgb(46, 202, 95)" }}
              />
            </div>
          </form>
        </div>
      );
      return (
        <div style={{ padding: "20px" }}>
          {/* <Link
            to={{ pathname: `/garden/${id}`, state: { garden } }}
            style={{ textDecoration: "none", color: "black" }}
          > */}
          <Card
            style={{
              width: "18rem",
              height: "350px",
              width: "280px",
              margin: "5px",
              color: "#0a3618",
              borderColor: "#006b28",
              borderWidth: ".5px",
              borderBottom: "5px solid #22b550",
            }}
            className="cardbox"
          >
            <Card.Img variant="top" style={{ height: "45%" }} />
            <Card.Body>
              <Card.Title>{garden_name}</Card.Title>
              <div>
                <Card.Text>
                  Some garden info Some garden info Some garden info Some garden
                  info
                </Card.Text>
                <Link to={{ pathname: `/garden/${id}`, state: { garden } }}>
                  <Button
                    variant="secondary"
                    style={{ backgroundColor: "#006b28", marginRight: "5px" }}
                  >
                    View
                  </Button>
                </Link>
                <Modal
                  form={editGardenForm}
                  label={"Edit"}
                  title={`Edit Garden`}
                  refresh={this.refresh}
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
                  onClick={() => this.deleteGarden(id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
          {/* </Link> */}
        </div>
      );
    });
    return display;
  };

  render() {
    const createGardenForm = (
      <div>
        <form
          className="col-md-4 mb-3"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2%",
          }}
          onSubmit={this.addGarden}
        >
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Garden Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name={"name"}
              onChange={this.inputHandler}
              placeholder={"Name"}
              style={{ marginBottom: "20px" }}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Garden"
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(46, 202, 95)" }}
            />
          </div>
        </form>
      </div>
    );

    const allGardens = this.displayGardens(this.state.all_gardens);
    return (
      <div>
        Gardens
        <div style={{ textAlign: "right" }}>
          <Modal
            form={createGardenForm}
            label={"Create A Garden"}
            title={`Create A Garden`}
            refresh={this.refresh}
          />
        </div>
        <div className="card-container-outer">
          <div className="card-container">{allGardens}</div>
        </div>
      </div>
    );
  }
}

export default Gardens;
