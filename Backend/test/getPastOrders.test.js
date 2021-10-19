// // Testing the display of customer's past orders based on the selected Filters
describe("POST /getPastOrders", function () {
  it("Should return the correct list of all past orders without any order status filter selected", function (done) {
    request
      .post("/getPastOrders")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ customerId: 1, orderStatus: "Delivered" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        let responseArray = response.body.filter((element) => {
          if (element.orderStatus !== "Delivered") return element;
        });
        assert.strictEqual(responseArray.length, 0);
      })
      .end(done);
  });
});

describe("POST /getPastOrders", function () {
  it("Should return the correct list of all past orders with a order status filter selected", function (done) {
    request
      .post("/getPastOrders")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ customerId: 1, orderStatus: "New Order" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        let responseArray = response.body.filter((element) => {
          if (element.orderStatus !== "New Order") return element;
        });
        assert.strictEqual(responseArray.length, 0);
      })
      .end(done);
  });
});
