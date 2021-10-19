import React, { useState } from "react";
import { Container, Row, Form, Col, Modal, Button } from "react-bootstrap";
import { getSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const AddDishModal = (props) => {
  let onClickValue = props.show;
  let onHideValue = props.onHide;

  const [addDishValues, setAddDishValues] = useState({});
  const session = getSessionCookie();

  const onChangeHandler = (event) => {
    event.preventDefault();

    setAddDishValues((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onImageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAddDishValues((prevState) => {
        return {
          ...prevState,
          imagePreview: URL.createObjectURL(event.target.files[0]),
          [event.target.name]: event.target.files[0],
        };
      });
    }
  };

  const viewImageHandler = () => {
    if (addDishValues.imagePreview) {
      return (
        <Form.Control
          name="imagePreview"
          type="image"
          src={addDishValues.imagePreview}
        />
      );
    }
  };

  const submitDishesHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("restaurantId", session.primaryID);
    formData.append("file", addDishValues.image);
    formData.append("dishName", addDishValues.dishName);
    formData.append("price", addDishValues.price);
    formData.append("description", addDishValues.description);
    formData.append("mainIngredients", addDishValues.mainIngredients);
    formData.append("dishType", addDishValues.dishType);
    formData.append("dishCategory", addDishValues.dishCategory);
    formData.append("cuisine", addDishValues.cuisine);

    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/addFoodItems`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      props.onHide();
      props.getDishesHandler();
      setAddDishValues({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={onClickValue}
      onHide={onHideValue}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Form onSubmit={submitDishesHandler}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Form>
              <p>Add dish!</p>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Dish Name</Form.Label>
                  <Form.Control
                    required
                    name="dishName"
                    placeholder="Enter dish name"
                    onChange={onChangeHandler}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    name="price"
                    placeholder="Enter price"
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Form.Group xs={12} md={12}>
                {viewImageHandler()}
                <Form.Control
                  name="image"
                  type="file"
                  accept="image/*"
                  placeholder="Upload Image"
                  onChange={onImageChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group xs={12} md={12}>
                <Form.Control
                  required
                  name="description"
                  placeholder="Enter dish description"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group>
                <Form.Control
                  name="mainIngredients"
                  placeholder="Enter main ingredients"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group xs={12} md={12}>
                  <Form.Select
                    required
                    name="dishType"
                    onChange={onChangeHandler}
                  >
                    <option>Select dish type</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Halal">Halal</option>
                    <option value="Gluten-free">Gluten-free</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={6} md={6}>
                <Form.Group xs={12} md={12}>
                  <Form.Select
                    required
                    name="dishCategory"
                    onChange={onChangeHandler}
                  >
                    <option>Select dish Category</option>
                    <option value="Salads">Salads</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Soups">Soups</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Deserts">Desserts</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group xs={12} md={12}>
                <Form.Select name="cuisine" onChange={onChangeHandler}>
                  <option>Select Cuisine</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="Italian">Italian</option>
                  <option value="Ethopian">Ethopian</option>
                  <option value="Thai">Thai</option>
                  <option value="French">French</option>
                  <option value="Singaporean">Singaporean</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Chinese</option>
                  <option value="South Indian">South Indian</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="dark">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddDishModal;
