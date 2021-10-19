import React from "react";
import { Container, Modal, Row, Col, Button, Form } from "react-bootstrap";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const RestaurantEditDetails = (props) => {
  const onChangeHandler = (event) => {
    event.preventDefault();

    props.setRestaurantDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const viewImageHandler = () => {
    if (props.profilePicture.imagePreview) {
      return (
        <Form.Control
          name="imagePreview"
          type="image"
          src={props.profilePicture.imagePreview}
        />
      );
    }
  };

  const onImageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      props.setProfilePicture((prevState) => {
        return {
          ...prevState,
          imagePreview: URL.createObjectURL(event.target.files[0]),
          [event.target.name]: event.target.files[0],
        };
      });
    }
  };

  const onSaveClickHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("about", props.restaurantDetails.about);
    formData.append("file", props.profilePicture.image);
    formData.append("restaurantId", props.restaurantDetails.restaurantId);
    formData.append("address", props.restaurantDetails.address);
    formData.append("city", props.restaurantDetails.city);
    formData.append("sate", props.restaurantDetails.state);
    formData.append("emailId", props.restaurantDetails.emailId);
    formData.append("contactNumber", props.restaurantDetails.contactNumber);
    formData.append("zipCode", props.restaurantDetails.zipCode);
    formData.append("openTime", props.restaurantDetails.openTime);
    formData.append("closeTime", props.restaurantDetails.closeTime);
    formData.append("deliveryFlag", props.restaurantDetails.deliveryFlag);
    formData.append("pickupFlag", props.restaurantDetails.pickupFlag);

    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/restaurantDetailsInfoUpdate`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      props.onHide();
      props.getRestaurantProfileInfo();
    } catch (error) {
      console.log(error);
    }
  };

  // let addressString =
  //   props.restaurantDetails.address +
  //   "," +
  //   props.restaurantDetails.city +
  //   "," +
  //   props.restaurantDetails.state +
  //   "," +
  //   props.restaurantDetails.zipCode;

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Form>
        <Modal.Header closeButton>
          <Row className="mb-3">
            <Form.Group>
              <Form.Control
                required
                name="restaurantName"
                defaultValue={
                  props.restaurantDetails.restaurantName
                    ? props.restaurantDetails.restaurantName
                    : "Restaurant Name"
                }
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Row>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Form.Group>
                {viewImageHandler()}
                <Form.Control
                  name="image"
                  // hidden={props.show}
                  type="file"
                  accept="image/*"
                  onChange={onImageChangeHandler}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>About</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "50px" }}
                  name="about"
                  defaultValue={
                    props.restaurantDetails.about
                      ? props.restaurantDetails.about
                      : "About"
                  }
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    defaultValue={
                      props.restaurantDetails.address
                        ? props.restaurantDetails.address
                        : "Address"
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    type="text"
                    defaultValue={
                      props.restaurantDetails.city
                        ? props.restaurantDetails.city
                        : "City"
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>ZipCode</Form.Label>
                  <Form.Control
                    name="zipCode"
                    type="text"
                    defaultValue={
                      props.restaurantDetails.zipCode
                        ? props.restaurantDetails.zipCode
                        : "zipCode"
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    type="text"
                    defaultValue={
                      props.restaurantDetails.state
                        ? props.restaurantDetails.state
                        : "State"
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    name="emailId"
                    defaultValue={
                      props.restaurantDetails.emailId
                        ? props.restaurantDetails.emailId
                        : "Email Id"
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    name="contactNumber"
                    defaultValue={
                      props.restaurantDetails.contactNumber
                        ? props.restaurantDetails.contactNumber
                        : "Contact Number"
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Open Time:</Form.Label>

                <Form.Control
                  name="openTime"
                  defaultValue={
                    props.restaurantDetails.openTime
                      ? props.restaurantDetails.openTime
                      : "HH:MM"
                  }
                  onChange={onChangeHandler}
                />
              </Col>

              <Col>
                <Form.Label>Close Time:</Form.Label>

                <Form.Control
                  name="closeTime"
                  defaultValue={
                    props.restaurantDetails.closeTime
                      ? props.restaurantDetails.closeTime
                      : "HH:MM"
                  }
                  onChange={onChangeHandler}
                />
              </Col>

              <Col>
                <Form.Label>Delivery Available</Form.Label>

                <Form.Select
                  name="deliveryFlag"
                  defaultValue={props.restaurantDetails.deliveryFlag}
                  onChange={onChangeHandler}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>Pickup Available: </Form.Label>

                <Form.Select
                  size="sm"
                  as="select"
                  name="pickupFlag"
                  defaultValue={props.restaurantDetails.pickupFlag}
                  onChange={onChangeHandler}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onSaveClickHandler}
            variant="dark"
            // hidden={props.show}
          >
            Save Profile
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RestaurantEditDetails;
