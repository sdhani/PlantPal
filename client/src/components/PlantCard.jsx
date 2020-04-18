import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

class PlantCard extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    const { plant_id, common_name } = this.props.plant;
    const img = this.props.plant.images.url;
    const plant = { ...this.props.plant };
    return (
      <Link
        to={{ pathname: `/plant/${plant_id}`, state: { plant } }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Card
          style={{
            width: "18rem",
            height: this.props.height || "350px",
            width: this.props.width || "280px",
            margin: "5px",
            color: "#0a3618",
            borderColor: "rgb(46, 202, 95)",
            borderWidth: ".5px",
            borderBottom: "5px solid rgb(46, 202, 95)",
          }}
          className="cardbox"
        >
          <Card.Img variant="top" src={img} style={{ height: "45%" }} />
          <Card.Body>
            <Card.Title>{common_name}</Card.Title>
            {!this.props.preview && (
              <div>
                <Card.Text>
                  Some plant info some plant info Some plant info some plant
                </Card.Text>
                <Link to={{ pathname: `/plant/${plant_id}`, state: { plant } }}>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#22b550" }}
                  >
                    View
                  </Button>
                </Link>
              </div>
            )}
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

export default PlantCard;
