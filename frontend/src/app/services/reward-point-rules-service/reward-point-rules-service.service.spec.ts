import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RewardPointRulesService } from './reward-point-rules-service.service';

describe('RewardPointRulesService', () => {
  let httpTestingController: HttpTestingController;
  let service: RewardPointRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(RewardPointRulesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRules returns response as expected', () => {
    const mockResponse = {
      "_id": "61fc57871119a7ddc22bc7e0",
      "rulesListName": "main",
      "rulesListId": 1001,
      "rulesList": [
        { "ruleId": 1, "points": 500, "conditions": [{ "merchantCode": "sportcheck", "purchaseAmount": 75, "_id": "61fc57871119a7ddc22bc7e2" }, { "merchantCode": "tim_hortons", "purchaseAmount": 25, "_id": "61fc57871119a7ddc22bc7e3" }, { "merchantCode": "subway", "purchaseAmount": 25, "_id": "61fc57871119a7ddc22bc7e4" }], "_id": "61fc57871119a7ddc22bc7e1" },
        { "ruleId": 2, "points": 300, "conditions": [{ "merchantCode": "sportcheck", "purchaseAmount": 75, "_id": "61fc57871119a7ddc22bc7e6" }, { "merchantCode": "tim_hortons", "purchaseAmount": 25, "_id": "61fc57871119a7ddc22bc7e7" }], "_id": "61fc57871119a7ddc22bc7e5" },
        { "ruleId": 3, "points": 200, "conditions": [{ "merchantCode": "sportcheck", "purchaseAmount": 75, "_id": "61fc57871119a7ddc22bc7e9" }], "_id": "61fc57871119a7ddc22bc7e8" },
        { "ruleId": 4, "points": 150, "conditions": [{ "merchantCode": "sportcheck", "purchaseAmount": 25, "_id": "61fc57871119a7ddc22bc7eb" }, { "merchantCode": "tim_hortons", "purchaseAmount": 10, "_id": "61fc57871119a7ddc22bc7ec" }, { "merchantCode": "subway", "purchaseAmount": 10, "_id": "61fc57871119a7ddc22bc7ed" }], "_id": "61fc57871119a7ddc22bc7ea" },
        { "ruleId": 5, "points": 75, "conditions": [{ "merchantCode": "sportcheck", "purchaseAmount": 25, "_id": "61fc57871119a7ddc22bc7ef" }, { "merchantCode": "tim_hortons", "purchaseAmount": 10, "_id": "61fc57871119a7ddc22bc7f0" }], "_id": "61fc57871119a7ddc22bc7ee" },
        { "ruleId": 6, "points": 75, "conditions": [{ "merchantCode": "sportcheck", "purchaseAmount": 20, "_id": "61fc57871119a7ddc22bc7f2" }], "_id": "61fc57871119a7ddc22bc7f1" },
        { "ruleId": 7, "points": 1, "conditions": [{ "merchantCode": "others", "purchaseAmount": 1, "_id": "61fc57871119a7ddc22bc7f4" }], "_id": "61fc57871119a7ddc22bc7f3" }], "__v": 0
    };
    service.getRules('main').subscribe((res) => {
      expect(res).toEqual(mockResponse)
    })

    const expectedUrl = "http://localhost:3000/getRules?selectedRules=main"
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse)
  })

});
