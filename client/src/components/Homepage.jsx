import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/home.css";
import plantData from "../dummy_plants.json";
import AlertCard from "./AlertMessage";
import PlantCard from "./PlantCard";
import CreateGardenForm from "./CreateGardenForm";
import styles2 from "../styles/cards.css";
import Gardens from "./Gardens";
import { getAllPriorityPlants, fetchWeather } from "../services/api";
import {
  getDateNeedsWater,
  getDateDifference,
  convertKelvinToFarenheight,
} from "../utils/helpers";

/**
 *
 * HOME:
 * should fetch weather data
 * should display alerts
 * should show preview of gardens
 */
class Homepage extends Component {
  state = { users: [], priorityPlants: [], alerts: [], temp: "", weather: [] };

  componentDidMount = async () => {
    getAllPriorityPlants().then((data) =>
      this.setState({ priorityPlants: data }, () => {
        console.log(data);
        let alerts =
          Array.isArray(this.state.priorityPlants) &&
          this.state.priorityPlants.map((plant) => (
            <AlertCard width={"95%"} plant={plant} />
          ));
        this.setState({ alerts });
      })
    );

    const weather_data = await fetchWeather();
    this.setState({
      temp: convertKelvinToFarenheight(weather_data.data.main.temp),
      weather: weather_data.data.weather[0],
    });

    console.log("temp", this.state.temp);
    console.log("weather", this.state.weather[0]);
  };
  render() {
    const { temp, weather } = this.state;
    const dummyPreviewIndoor = plantData.slice(1, 6);
    const dummyPreviewOutdoor = plantData.slice(4, 9);
    const indoorPreview = dummyPreviewIndoor.map((plant) => {
      return (
        <PlantCard
          plant={plant}
          width={"150px"}
          height={"150px"}
          preview={true}
        />
      );
    });
    const outdoorPreview = dummyPreviewOutdoor.map((plant) => {
      return (
        <PlantCard
          plant={plant}
          width={"150px"}
          height={"150px"}
          preview={true}
        />
      );
    });
    const weatherMessage =
      weather && weather.main && weather.main.toLowerCase().includes("rain")
        ? "No need to water your plants today!"
        : temp > 90
        ? "It's super hot today! Don't miss out on watering your plants"
        : "No extreme weather conditions today!";
    return (
      <div>
        <Container fluid className="grid_container">
          <Row>
            <Col xs={8} style={{ marginLeft: "25px", height: "100vh" }}>
              {/* <Gardens /> */}
            </Col>

            {/* <Col xs={8} style={{ marginLeft: "25px", height: "100vh" }}>
              <Row className="preview">
                <Card
                  style={{
                    width: "inherit",
                    minHeight: "37vh",
                    borderColor: "darkgrey",
                  }}
                >
                  <Link
                    to="/outdoorgarden"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Card.Header
                      as="h4"
                      style={{
                        color: "white",
                        backgroundColor: "#0c9437",
                        opacity: ".7",
                      }}
                    >
                      Outdoor Garden
                    </Card.Header>{" "}
                  </Link>
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
                <Card
                  style={{
                    width: "inherit",
                    minHeight: "37vh",
                    borderColor: "darkgrey",
                  }}
                >
                  <Link
                    to="/indoorgarden"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Card.Header
                      as="h4"
                      style={{
                        color: "white",
                        backgroundColor: "rgb(137, 218, 31)",
                        opacity: ".7",
                      }}
                    >
                      Indoor Garden
                    </Card.Header>
                  </Link>
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
            </Col> */}
            <Col style={{ height: "100vh" }}>
              <Row className="preview">
                <Card
                  style={{
                    minHeight: "15vh",
                    width: "inherit",
                    borderColor: "darkgrey",
                  }}
                >
                  <Card.Header
                    as="h4"
                    style={{
                      color: "white",
                      backgroundColor: "#22b5ae",
                      opacity: ".7",
                    }}
                  >
                    Weather for {new Date(Date.now()).toDateString()}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{temp} 'F</Card.Title>

                    <Card.Text>Forecast: {weather.main}</Card.Text>
                    <Card.Text>Description: {weather.description}</Card.Text>
                    <Card.Text>{weatherMessage}</Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="preview">
                <Card
                  style={{
                    height: "50vh",
                    width: "inherit",
                    borderColor: "darkgrey",
                  }}
                >
                  <Card.Header
                    as="h4"
                    style={{
                      color: "white",
                      backgroundColor: "#22b550",
                      opacity: ".7",
                    }}
                  >
                    Alerts
                  </Card.Header>
                  <Card.Body>
                    <div style={{ height: "95%", overflow: "auto" }}>
                      {!this.state.alerts.length
                        ? "You Have No Alerts"
                        : this.state.alerts}
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>

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
