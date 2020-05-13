import React, { Component } from "react";
import axios from "axios";
import {
  createGarden,
  fetchGarden,
  deleteGarden,
  editGarden,
} from "../services/api.js";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Modal from "./Modal";
import CreateGardenForm from "./CreateGardenForm.jsx";
import styles from "../styles/cards.css";

class GardensGrid extends Component {
  state = { all_gardens: [] };
  componentDidMount() {
    fetchGarden().then((data) => this.setState({ all_gardens: data }));
  }
  displayGardens = (gardens) => {
    gardens = gardens.length > 6 ? gardens.splice(6) : gardens;
    const display = gardens.map((garden) => {
      const { id, garden_name } = garden;
      garden.all_gardens = gardens;
      return (
        <div style={{ padding: "20px" }}>
          <Card
            style={{
              width: "18rem",
              height: "300px",
              width: "220px",
              margin: "5px",
              color: "#0a3618",
              borderColor: "#006b28",
              borderWidth: ".5px",
              borderBottom: "5px solid #22b550",
            }}
            className="cardbox"
          >
            <Card.Img
              src={require("../images/stock_garden.jpg")}
              variant="top"
              style={{ height: "45%", opacity: "80%" }}
            />
            <Card.Body>
              <Card.Title>{garden_name}</Card.Title>
              <div>
                <Card.Text>Some Text</Card.Text>
                <Link
                  to={{
                    pathname: `/garden/${id}`,
                    state: { garden },
                  }}
                >
                  <Button
                    variant="secondary"
                    style={{ backgroundColor: "#006b28", marginRight: "5px" }}
                  >
                    View
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      );
    });
    return display;
  };

  render() {
    const allGardens = this.displayGardens(this.state.all_gardens);
    return (
      <div>
        <div className="card-container-outer">
          <div className="card-container">
            {allGardens.length ? allGardens : <h1>You have no gardens yet</h1>}
          </div>
        </div>
      </div>
    );
  }
}

export default GardensGrid;
