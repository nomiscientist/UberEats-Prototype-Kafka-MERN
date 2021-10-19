import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Background from "../images/uberEats_mainhomepage.jpeg";
import UberEatsIcon from "../images/UberEatsIcon.png";

const HomePage = (props) => {
  return (
    <Container fluid className="mt-4" style={{ backgroundColor: "lightgrey" }}>
      <Row>
        <Col md={1}>
          <Image src={UberEatsIcon} />
        </Col>
        <Col xs={12} md={7}></Col>
        <Col md={4}>
          <Link to="/restaurantLogin">
            {" "}
            <Button variant="dark">Restaurant Login</Button>{" "}
          </Link>
          <Link to="/customerLogin">
            {" "}
            <Button variant="dark">Customer Login</Button>{" "}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={Background} />
        </Col>
      </Row>
      <Row style={{ backgroundColor: "grey" }}></Row>
    </Container>
  );
};

export default HomePage;
