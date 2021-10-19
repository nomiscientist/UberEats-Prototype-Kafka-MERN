// // Testing the display of customer's profile
describe("POST /showCustomerProfile", function () {
  it("Should return the correct customer profile details with success code 200", function (done) {
    request
      .post("/showCustomerProfile")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ customerId: 1 })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
      })
      .end(done);
  });
});
