import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { getPlant, deletePlant } from "../../src/services/api.js";

class PlantCard extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("plant props", this.props.plant);
    // const { id, common_name, last_watered, outdoor_plant } = this.props.plant;
    // console.log("id stuff", id);
    // getPlant(id).then((data) => this.setState({ plant: data }));
  }

  deletePlant = async () => {
    const { id } = this.props.plant;
    deletePlant(id).then((data) => {
      console.log("deleted", data);
      console.log("refresshing", this.props.refresh);
      return this.props.refresh && this.props.refresh();
    });

    // this.props.refresh && this.props.refresh();
  };
  render() {
    const { id, common_name, last_watered, outdoor_plant } = this.props.plant;

    const img =
      this.props.plant.images && this.props.plant.images.url
        ? this.props.plant.images.url
        : undefined;
    const plant = { ...this.props.plant };

    // const { plant } = this.state;
    return (
      // <Link
      //   to={{ pathname: `/plant/${id}`, state: { plant } }}
      //   style={{ textDecoration: "none", color: "black" }}
      // >
      <Card
        style={{
          width: "18rem",
          height: this.props.height || "350px",
          width: this.props.width || "280px",
          margin: "5px",
          color: "#0a3618",
          borderColor: "#006b28",
          borderWidth: ".5px",
          borderBottom: "5px solid #22b550",
        }}
        className="cardbox"
      >
        <Card.Img variant="top" src={img} style={{ height: "45%" }} />
        <Card.Body>
          <Card.Title>{common_name}</Card.Title>
          {!this.props.preview && (
            <div>
              <Card.Text>
                {outdoor_plant}
                {last_watered}
                Some plant info some plant info Some plant info some plant
              </Card.Text>
              {/* <Card.Text className="text-muted">2 days ago</Card.Text> */}
              <Link to={{ pathname: `/plant/${id}`, state: { plant } }}>
                <Button
                  variant="secondary"
                  style={{ backgroundColor: "#006b28", marginRight: "5px" }}
                >
                  View
                </Button>
              </Link>
              <Button
                variant="secondary"
                style={{ backgroundColor: "#bfe046", marginRight: "5px" }}
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                style={{ backgroundColor: "#db5c58" }}
                onClick={this.deletePlant}
              >
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      // </Link>
    );
  }
}

export default PlantCard;
