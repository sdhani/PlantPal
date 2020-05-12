import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { getDateNeedsWater, getDateDifference } from "../utils/helpers";
import { Link } from "react-router-dom";

class AlertCard extends Component {
  state = {};
  render() {
    const { plant } = this.props;
    const {
      id,
      name,
      common_name,
      last_watered,
      outdoor_plant,
      days_until_needs_water,
    } = plant;
    const dateNeedsWater = getDateNeedsWater(
      last_watered,
      days_until_needs_water
    );
    const daysLeft = getDateDifference(new Date(Date.now()), dateNeedsWater);
    const variant =
      daysLeft === 1 ? "warning" : daysLeft < 0 ? "danger" : "info";

    return (
      <Card
        bg={variant.toLowerCase()}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
        style={{
          width: this.props.width || "20vw",
          height: "125px",
          marginBottom: "10px",
          opacity: ".85",
        }}
      >
        <Card.Header>
          {daysLeft === 1
            ? "Your plant needs to be watered today!"
            : daysLeft > 0
            ? `Your plant needs to be watered in ${daysLeft} days`
            : `Your plant should've been watered ${Math.abs(
                daysLeft
              )} days ago`}
        </Card.Header>
        <Card.Body style={{ padding: "7px" }}>
          <Card.Title style={{ margin: "0px" }}>
            <Link
              to={`/plant/${id}`}
              style={{ fontSize: ".9em", color: "white" }}
            >
              View plant "{name || common_name}"
            </Link>
          </Card.Title>
          <Card.Text style={{ fontSize: ".9em" }}>
            "{name || common_name}" needs to be watered by{" "}
            {dateNeedsWater.toDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default AlertCard;
