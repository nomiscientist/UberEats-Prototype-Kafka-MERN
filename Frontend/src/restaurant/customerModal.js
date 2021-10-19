import { Row, Col, Modal } from "react-bootstrap";
import React from "react";

const CustomerModal = (props) => {
  <Col>${props.customerDetails.addressLine1}</Col>;

  return (
    <Modal
      show={props.customerDetailsModalShow}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      variant="dark"
    >
      <Modal.Header closeButton>
        <h4> Customer Details</h4>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body variant="dark">
        <Row>
          <Col>
            <h6>Customer Name</h6>
          </Col>
          <Col>{props.customerDetails.firstName}</Col>
          <Col>{props.customerDetails.lastName}</Col>
        </Row>
        <Row>
          <Col>
            <h6>Address</h6>
          </Col>
          <Col>{props.customerDetails.addressLine1 + ", "}</Col>
          <Col>{props.customerDetails.addressLine2 + ", "}</Col>
          <Col>{props.customerDetails.city + ", "}</Col>
          <Col>{props.customerDetails.zipCode}</Col>
        </Row>
        <Row>
          <Col>
            <h6>Contact Number</h6>
          </Col>
          <Col>{props.customerDetails.contactNumber}</Col>
        </Row>
        <Row>
          <Col>
            <h6>Email address</h6>
          </Col>
          <Col>{props.customerDetails.emailId}</Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerModal;
