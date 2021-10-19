import { useState } from "react";
import { Button, Row, Col, Form, Container, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Background from "../images/restaurantSignUp.jpeg";
import { useDispatch } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants";
import { useHistory } from "react-router-dom";
import { setSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import UberEatsIcon from "../images/UberEatsIcon.png";

function request(user) {
  return { type: reduxConstants.LOGIN_REQUEST, user };
}
function success(user) {
  return { type: reduxConstants.LOGIN_SUCCESS, user };
}
function failure(error) {
  return { type: reduxConstants.LOGIN_FAILURE, error };
}

const RestaurantLogin = (props) => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dispatch = useDispatch();

  const onEmailChangeHandler = (event) => {
    event.preventDefault();
    setUserEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    event.preventDefault();
    setUserPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    dispatch(request({ userEmail }));
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/restaurantLoginInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: userEmail,
            password: userPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setSessionCookie(
          JSON.stringify({
            primaryID: data.restaurantId,
            restaurantFlag: true,
          })
        );
        dispatch(success({ userEmail }));
        history.replace("/restaurantDetails");
      } else if (response.status === 401) {
        alert("Incorrect Email Id or Password. Please try again !");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      alert("Internal Server Error!!");
      dispatch(failure(error.toString()));
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Row>
          <Col md={1}>
            <Image src={UberEatsIcon} />
          </Col>
        </Row>
        <Col md={7}>
          <Image src={Background} height="70%" width="70%" />
        </Col>

        <Col>
          <p></p>
          <Card>
            <Row>
              <h1 style={{ backgroundColor: "grey" }}>Restaurant Login</h1>
            </Row>
            <Form onSubmit={onSubmitHandler}>
              <Row className="mb-3">
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control
                      name="emailId"
                      type="email"
                      required
                      placeholder="Enter email Id"
                      onChange={onEmailChangeHandler}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                      onChange={onPasswordChangeHandler}
                    />
                  </Form.Group>
                </Row>
              </Row>
              <Button variant="dark" type="submit">
                Sign In
              </Button>
            </Form>
          </Card>
          <p></p>

          <Card fuild className="mt-5">
            <Form.Label>New User?</Form.Label>
            <Link to="/restaurantSignUp">
              <Button variant="dark" type="submit">
                SignUp
              </Button>
            </Link>
            <Link className="my-3" to="/">
              <Button variant="dark">HomePage</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantLogin;
