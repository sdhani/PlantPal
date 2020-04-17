import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

class PlantCard extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    const { name, family, img } = this.props;
    console.log(this.props);
    return (
      <Card
        style={{
          width: "18rem",
          height: "500px",
          width: "400px",
        }}
      >
        <Card.Img variant="top" src={img} style={{ height: "300px" }} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Some plant info some plant info Some plant info some plant info Some
            plant info some plant info
          </Card.Text>
          <Link to="/plant">
            <Button variant="primary" style={{ backgroundColor: "#23cf53" }}>
              View
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default PlantCard;
