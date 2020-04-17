import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/home.css";
import plantData from "../dummy_plants.json";
import AlertCard from "./AlertMessage";
import PlantCard from "./PlantCard";
import styles2 from "../styles/cards.css";

/**
 *
 * HOME:
 * should fetch weather data
 * should display alerts
 * should show preview of gardens
 */
class Homepage extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => this.setState({ users }));
  }

  render() {
    const dummyAlerts = [
      {
        variant: "danger",
        info: "plant x will die soon",
      },
      {
        variant: "warning",
        info: "plant x will die soon",
      },
      {
        variant: "warning",
        info: "plant x will die soon",
      },
      {
        variant: "danger",
        info: "plant x will die soon",
      },
      {
        variant: "warning",
        info: "plant x will die soon",
      },
    ];

    const dummyPreviewIndoor = plantData.slice(1, 6);
    const dummyPreviewOutdoor = plantData.slice(4, 9);

    const alerts = dummyAlerts.map((alert) => {
      return (
        <AlertCard width={"95%"} variant={alert.variant} content={alert.info} />
      );
    });

    const indoorPreview = dummyPreviewIndoor.map((plant) => {
      return (
        <PlantCard
          plant={plant}
          width={"200px"}
          height={"200px"}
          preview={true}
        />
      );
    });
    const outdoorPreview = dummyPreviewOutdoor.map((plant) => {
      return (
        <PlantCard
          plant={plant}
          width={"200px"}
          height={"200px"}
          preview={true}
        />
      );
    });
    return (
      <div>
        <Container fluid className="grid_container">
          <Row>
            <Col xs={8} style={{ marginLeft: "25px", height: "100vh" }}>
              <Row className="preview">
                <Card style={{ width: "inherit", height: "40vh" }}>
                  <Card.Header as="h5">Outdoor Garden</Card.Header>
                  <Card.Body>
                    <Card.Title>You have no plants to water today!</Card.Title>
                    <div className="card-container-outer">
                      <div
                        className="card-container"
                        style={{
                          height: "40%",
                          width: "100%",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {outdoorPreview}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="preview">
                <Card style={{ width: "inherit", height: "40vh" }}>
                  <Card.Header as="h5">Indoor Garden</Card.Header>
                  <Card.Body>
                    <Card.Title>You have no plants to water today!</Card.Title>
                    <div className="card-container-outer">
                      <div
                        className="card-container"
                        style={{
                          height: "40%",
                          width: "100%",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {indoorPreview}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
            <Col style={{ height: "100vh" }}>
              <Row className="preview">
                <Card style={{ minHeight: "15vh", width: "inherit" }}>
                  <Card.Header as="h5">Weather</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {new Date(Date.now()).toDateString()}
                    </Card.Title>
                    <Card.Text>It is super hot today</Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="preview">
                <Card
                  style={{
                    height: "50vh",
                    width: "inherit",
                  }}
                >
                  <Card.Header as="h5">Alerts</Card.Header>
                  <Card.Body>
                    <Card.Title>Your Alerts</Card.Title>
                    <div style={{ height: "90%", overflow: "auto" }}>
                      {alerts}
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
        <Link to="/outdoorgarden">
          <h3>Outdoor Garden</h3>
        </Link>
        <Link to="/indoorgarden">
          <h3>Indoor Garden</h3>
        </Link>
        <ul>
          {this.state.users.map((user) => {
            return (
              <li key={user.email}>
                {" "}
                <b>User:</b>
                <p>{user.email}</p>
                <p>{user.display_name}</p>
                <p>{user.weather_zipcode}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Homepage;
