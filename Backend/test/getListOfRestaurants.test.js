//Testing the POST API to display the list of all restaurants with delivery/pickup options

describe("POST /getListOfRestaurants", function () {
  it("Should return list of all restaurants based on delivery/pickup toggle selected in order of customer location ", function (done) {
    request
      .post("/getListOfRestaurants")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        filter: [],
        typeaheadValue: [],
        customerId: 1,
        deliveryType: "delivery",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;

        let responseArray = response.body.filter((element) => {
          if (element.DeliveryFlag === "No") return element;
        });
        assert.strictEqual(responseArray.length, 0);
      })
      .end(done);
  });
});

//Testing the POST API to display the list of all restaurants with delivery/pickup options along with Typeahead filter
describe("POST /getTypeaheadList", function () {
  it("Should return list of all restaurants based on delivery/pickup toggle selected along with Typeahead filter for a restaurant search", function (done) {
    request
      .post("/getTypeaheadList")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ input: "Biri" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;

        let element = response.body[0];
        assert.strictEqual(element.name, "Biriyani House");
        assert.strictEqual(element.isRestaurant, true);
      })
      .end(done);
  });
});
