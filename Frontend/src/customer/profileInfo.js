import { useState, useEffect } from "react";
import { getSessionCookie } from "../common/session";
import { Button, Row, Col, Form, Card, Container } from "react-bootstrap";
import Holder from "../images/profileHolder.png";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import countryList from "react-select-country-list";
import {
  formatPhoneNumber,
  isValidEmail,
  validateZipcode,
} from "../common/formValidations";

const ProfileInfo = (props) => {
  let countryArray = ["..."];
  countryArray.push(...countryList().getLabels());

  const options = countryArray.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
  const session = getSessionCookie();
  const [customerDetails, setCustomerDetails] = useState({});

  const onChangeHandler = (event) => {
    event.preventDefault();

    if (event.target.name === "contactNumber") {
      event.target.value = formatPhoneNumber(event.target.value);
    }

    setCustomerDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onImageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCustomerDetails((prevState) => {
        return {
          ...prevState,
          imagePreview: URL.createObjectURL(event.target.files[0]),
          [event.target.name]: event.target.files[0],
        };
      });
    }
  };

  const viewImageHandler = () => {
    if (customerDetails.imagePreview) {
      return (
        <Card.Img
          variant="top"
          src={customerDetails.imagePreview}
          height="200px"
        />
      );
    } else {
      return <Card.Img variant="top" src={Holder} height="200px" />;
    }
  };

  const updateProfileInfo = async (event) => {
    event.preventDefault();

    if (customerDetails.zipCode && !validateZipcode(customerDetails.zipCode)) {
      alert("Enter a valid Zip Code!");
      return;
    }

    if (!isValidEmail(customerDetails.emailId)) {
      alert("Enter a valid format of email id!");
      return;
    }

    const formData = new FormData();
    formData.append("file", customerDetails.image);
    formData.append("customerId", session.primaryID);
    formData.append("lastName", customerDetails.lastName);
    formData.append("firstName", customerDetails.firstName);
    formData.append("address1", customerDetails.address1);
    formData.append("address2", customerDetails.address2);
    formData.append("city", customerDetails.city);
    formData.append("state", customerDetails.state);
    formData.append("country", customerDetails.country);
    formData.append("zipCode", customerDetails.zipCode);
    formData.append("nickname", customerDetails.nickname);
    formData.append("contactNumber", customerDetails.contactNumber);
    formData.append("emailId", customerDetails.emailId);
    formData.append("about", customerDetails.about);
    if (customerDetails.dateOfBirth)
      formData.append("dateOfBirth", customerDetails.dateOfBirth);

    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/updateProfileInfo`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerProfileInfo = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getProfileInfo?customerId=${session.primaryID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json, charset= UTF-8",
          Accept: "application/json, text/html, image/png",
        },
      }
    );

    const data = await response.json();

    setCustomerDetails((prevState) => {
      let customerImageObject;

      if (data.image) {
        customerImageObject = {
          imagePreview: `http://${NODE_HOST}:${NODE_PORT}/` + data.image,
        };
      } else {
        customerImageObject = {
          imagePreview: Holder,
        };
      }
      let dateArray = data.dateOfBirth?.split("T");
      return {
        ...prevState,
        ...customerImageObject,
        lastName: data.lastName,
        firstName: data.firstName,
        password: data.password,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        nickname: data.nickname,
        contactNumber: data.contactNumber,
        emailId: data.emailId,
        dateOfBirth: dateArray ? dateArray[0] : data.dateOfBirth,
        about: data.about,
      };
    });
  };

  useEffect(() => {
    getCustomerProfileInfo();
  }, []);

  return (
    <Container fluid className="mt-1" style={{ backgroundColor: "#ffffe6" }}>
      <h1>Customer Profile</h1>
      <font size="3" class="font-weight-bold">
        <Form onSubmit={updateProfileInfo}>
          <Row>
            <Col md={1}></Col>
            <Col xs={12} md={4} fluid className="mt-2">
              <Form.Group as={Col} xs={12} md={7}>
                <Card style={{ width: " 16rem" }}>
                  {viewImageHandler()}
                  <Form.Control
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={onImageChangeHandler}
                  />
                  <Form.Label>Profile Image</Form.Label>
                </Card>
              </Form.Group>

              <Form.Group as={Col} className="mt-2">
                <Form.Control
                  style={{ height: "100px", width: " 340px" }}
                  name="about"
                  value={
                    customerDetails.about !== null ? customerDetails.about : ""
                  }
                  placeholder="About me...."
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} fluid className="mt-2">
              <Row className="mb-1">
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    required
                    placeholder="First Name"
                    value={customerDetails.firstName}
                    onChange={onChangeHandler}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    placeholder="Last Name"
                    value={customerDetails.lastName}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-1">
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="emailId"
                    type="email"
                    required
                    placeholder="Enter email"
                    value={customerDetails.emailId}
                    onChange={onChangeHandler}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    name="contactNumber"
                    placeholder="+1()"
                    value={customerDetails.contactNumber}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-1">
                <Form.Group as={Col}>
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    name="nickname"
                    placeholder="Nickname"
                    value={
                      customerDetails.nickname !== null
                        ? customerDetails.nickname
                        : ""
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    name="dateOfBirth"
                    type="date"
                    value={customerDetails.dateOfBirth}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address1"
                  placeholder="1234 Main St"
                  value={
                    customerDetails.address1 !== null
                      ? customerDetails.address1
                      : ""
                  }
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  name="address2"
                  placeholder="Apartment, studio, or floor"
                  value={
                    customerDetails.address2 !== null
                      ? customerDetails.address2
                      : ""
                  }
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Row className="mb-1">
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    placeholder="City"
                    value={customerDetails.city}
                    onChange={onChangeHandler}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    placeholder="State"
                    value={customerDetails.state}
                    onChange={onChangeHandler}
                  />
                </Form.Group>

                <Form.Group required as={Col}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    as="select"
                    onChange={onChangeHandler}
                    value={customerDetails.country}
                  >
                    ...
                    {options}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    name="zipCode"
                    value={
                      customerDetails.zipCode !== null
                        ? customerDetails.zipCode
                        : ""
                    }
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Row>

              <Button variant="dark" type="submit">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </font>
    </Container>
  );
};

export default ProfileInfo;
