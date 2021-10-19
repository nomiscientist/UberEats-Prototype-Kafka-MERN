// Testing the customerSignIn when email ID and password both are correct- Successful Login
describe("POST /customerSignIn", function () {
  it("Should success if credential is Valid", function (done) {
    request
      .post("/customerSignIn")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ emailId: "user1@gmail.com", password: "Archita22" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        expect(response.body).not.to.be.empty;
        assert.strictEqual(response.body.successFlag, true);
      })
      .end(done);
  });
});

// Testing the customerSignIn when incorrect email ID is entered- Login Failed.
describe("POST /customerSignIn", function () {
  it("Should fail if credential is InValid", function (done) {
    request
      .post("/customerSignIn")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ emailId: "usergmail.com", password: "Archita22" })
      .expect(401)
      .end(done);
  });
});

// Testing the customerSignIn when incorrect password is entered- Login Failed.

describe("POST /customerSignIn", function () {
  it("Should fail if credential is InValid", function (done) {
    request
      .post("/customerSignIn")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ emailId: "user1gmail.com", password: "archi" })
      .expect(401)
      .expect(function (response) {
        expect(response.body).to.be.an("object");
        expect(response.body).not.to.be.empty;
        assert.strictEqual(
          response.body.error,
          "Incorrect Email ID or Password Login!"
        );
      })
      .end(done);
  });
});
