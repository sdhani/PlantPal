import React, { Component } from 'react';
import axios from "axios";
import { createGarden, fetchGarden } from "../../src/services/api.js"
import { Button } from 'react-bootstrap';
import Modal from "./Modal";

class Gardens extends Component {
    state = {}
    componentDidMount() {
        fetchGarden().then(data => console.log(data))
    }
    addGarden = (e) => {
        e.preventDefault();
        return createGarden(this.state.name).then(data => { console.log("created"); return data })
    }
    inputHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
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
            </div >
        );

        return (<div>Gardens
            <div style={{ textAlign: "right" }}>
                <Modal
                    form={createGardenForm}
                    label={"Create A Garden"}
                    title={`Create A Garden`}
                // refresh={this.refresh}
                />
            </div>
        </div>);
    }
}

export default Gardens;