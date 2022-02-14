import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { RewardPointsCalculatorService } from './reward-points-calculator-services.service';

describe('RewardPointsCalculatorService', () => {
  let httpTestingController: HttpTestingController;
  let service: RewardPointsCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(RewardPointsCalculatorService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRewardPoints returns observable', () => {
    expect(service.getRewardPoints('main', [ { date: "1/1/2021", merchant_code: "subway", amount_cents: 5000} ])).toBeInstanceOf(Observable);
  });

  it('getRewardPoints returns response as expected', () => {
    const mockResponse = {
      "rewardPoints": 50,
      "rulesApplied": {
        "7":50
      }
    };
    service.getRewardPoints('main', [ { date: "1/1/2021", merchant_code: "subway", amount_cents: 5000} ]).subscribe((res) => {
      expect(res).toEqual(mockResponse)
    })

    const expectedUrl = "http://localhost:3000/calculateRewardPoints"
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse)
  })

});
