var request = require("request");
var server = require("./app");

describe("Server", () => {
    describe("GET /getRules", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/getRules", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                console.log("data test ====> ", data);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.rulesListName).toBe('main');
        });
    });

    // describe("POST /calculateRewardPoints", () => {
    //   var data = {};
    //   var input = [ { date: "1/1/2021", merchant_code: "subway", amount_cents: 5000} ];
    //   beforeAll((done) => {
    //       request({method:'POST', uri: "http://localhost:3000/calculateRewardPoints", body: input}, (error, response, body) => {
    //           console.log("calculateRewardPoints test ====> ", data, response);
    //           data.status = response.statusCode;
    //           data.body = JSON.parse(body);
    //           done();
    //       });
    //   });
    //   it("Status 200", () => {
    //       expect(data.status).toBe(200);
    //   });
    //   it("Body", () => {
    //       expect(data.body).toBe('main');
    //   });
    // });

});
