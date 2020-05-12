import React, { Component, useState } from "react";
import { Button, Modal } from "react-bootstrap";

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      water: 0,
      startDate: new Date(),
    };
  }
  genericModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      this.props.refresh && this.props.refresh();
    };
    const handleShow = () => setShow(true);

    const buttonStyles = this.props.buttonStyles
      ? this.props.buttonStyles
      : { backgroundColor: "#006b28" };
    return (
      <>
        <Button
          variant={this.props.variant || "primary"}
          size={this.props.variant ? "m" : "lg"}
          onClick={handleShow}
          style={buttonStyles}
        >
          {this.props.label}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body> {this.props.form}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              style={{ backgroundColor: "#0e5428" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  render() {
    return <this.genericModal />;
  }
}

export default MyModal;
