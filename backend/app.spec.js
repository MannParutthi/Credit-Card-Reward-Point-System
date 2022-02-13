const request = require('supertest');
var app = require('./app');

describe("Server", () => {
    describe("GET /getRules", () => {
        it("GET", (done) => {
            request(app).get('/getRules')
                        .query({selectedRules: "main"})
                        .expect(200)
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect((res) => { 
                            res.body.rulesListName = 'main';
                        })
                        .end((error) => (error) ? done.fail(error) : done());
        });
    });

    describe("POST /calculateRewardPoints", () => {
      var input = [ { date: "1/1/2021", merchant_code: "sportcheck", amount_cents: 8000}, { date: "1/1/2021", merchant_code: "the_bay", amount_cents: 4500} ];
      it('POST', (done) => {
        request(app).post('/calculateRewardPoints')
                    .send({ selectedRules: 'main', transactionsList: input})
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect((res) => { 
                        res.body.rewardPoints > 0;
                    })
                    .end((error) => (error) ? done.fail(error) : done());
      });
    });

});
