import React from "react";
import { Container, Row, Form, Col, Modal, Button } from "react-bootstrap";
import { getSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const EditDishModal = (props) => {
  let onShowVal = props.dishItem.show;

  const session = getSessionCookie();

  const onChangeHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    props.setRenderedList((prevState) => {
      let newListOfDishes = [...prevState];
      newListOfDishes[props.keyValue] = {
        ...newListOfDishes[props.keyValue],
        [event.target.name]: event.target.value,
      };
      return newListOfDishes;
    });
  };

  const onImageChangeHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.files && event.target.files[0]) {
      props.setRenderedList((prevState) => {
        let newListOfDishes = [...prevState];
        newListOfDishes[props.keyValue] = {
          ...newListOfDishes[props.keyValue],
          imagePreview: URL.createObjectURL(event.target.files[0]),
          [event.target.name]: event.target.files[0],
        };

        return newListOfDishes;
      });
    }
  };

  const viewImageHandler = () => {
    if (props.dishItem.image) {
      return (
        <Form.Control
          name="imagePreview"
          type="image"
          src={props.dishItem.imagePreview}
        />
      );
    }
  };

  const submitDishesHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("restaurantId", session.primaryID);
    formData.append("foodId", props.dishItem.foodId);
    formData.append("file", props.dishItem.image);
    formData.append("dishName", props.dishItem.dishName);
    formData.append("price", props.dishItem.price);
    formData.append("description", props.dishItem.description);
    formData.append("mainIngredients", props.dishItem.mainIngredients);
    formData.append("dishType", props.dishItem.dishType);
    formData.append("dishCategory", props.dishItem.dishCategory);
    formData.append("cuisine", props.dishItem.cuisine);

    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/editFoodItems`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      props.onHide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={onShowVal}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Form onSubmit={submitDishesHandler}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Form>
              <p>Edit dish!</p>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Dish Name</Form.Label>
                  <Form.Control
                    name="dishName"
                    placeholder="Dish Name"
                    defaultValue={props.dishItem.dishName}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    placeholder="$$"
                    defaultValue={props.dishItem.price}
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
                  name="description"
                  placeholder="Enter dish description"
                  defaultValue={props.dishItem.description}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group>
                <Form.Control
                  name="mainIngredients"
                  placeholder="Enter main ingredients"
                  defaultValue={props.dishItem.mainIngredients}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group xs={12} md={12}>
                  <Form.Select
                    name="dishType"
                    defaultValue={props.dishItem.dishType}
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
                    name="dishCategory"
                    defaultValue={props.dishItem.dishCategory}
                    onChange={onChangeHandler}
                  >
                    <option>Select dish Category</option>
                    <option value="Salads">Salads</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Soups">Soups</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Deserts</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group xs={12} md={12}>
                <Form.Select
                  name="cuisine"
                  defaultValue={props.dishItem.cuisine}
                  onChange={onChangeHandler}
                >
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

export default EditDishModal;
