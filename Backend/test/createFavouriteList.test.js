// //Testing the POST API to create customer favorite list fo restaurants
describe("POST /createFavouritesList", function () {
  it("Should return the restaurant id of the one being liked or unliked on heart click ", function (done) {
    request
      .post("/createFavouritesList")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ customerId: 1, restaurantId: 6 })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        assert.strictEqual(response.body.restaurantID, 6);
      })
      .end(done);
  });
});
