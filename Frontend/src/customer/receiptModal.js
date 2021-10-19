import { Row, Col, Modal } from "react-bootstrap";
import React from "react";

const ReceiptModal = (props) => {
  const displayReceiptDetails = () => {
    return props.receiptDetails.map((dishItem, key) => {
      return (
        <Row key = {key}>
          <Col>{dishItem.quantity}</Col>
          <Col>{dishItem.foodName}</Col>
          <Col>${dishItem.price}</Col>
        </Row>
      );
    });
  };

  return (
    <Modal
      show={props.receiptModalShow}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      variant="dark"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body variant="dark">
        <Row>
          <Col>
            <h5>Quantity</h5>
          </Col>
          <Col>
            <h5>Dish Name</h5>
          </Col>
          <Col>
            <h5>Price</h5>
          </Col>
        </Row>
        {displayReceiptDetails()}
      </Modal.Body>
    </Modal>
  );
};

export default ReceiptModal;
