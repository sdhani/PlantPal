import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
class AlertCard extends Component {
  state = {};
  render() {
    const { variant } = this.props;
    return (
      <Card
        bg={variant.toLowerCase()}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
        style={{
          width: this.props.width || "20vw",
          height: "100px",
          marginBottom: "10px",
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>{variant} Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default AlertCard;
