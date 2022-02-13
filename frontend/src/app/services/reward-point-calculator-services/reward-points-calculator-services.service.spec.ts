import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { RewardPointsCalculatorService } from './reward-points-calculator-services.service';

describe('RewardPointsCalculatorService', () => {
  let service: RewardPointsCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RewardPointsCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRewardPoints', () => {
    expect(service.getRewardPoints('main', [ { date: "1/1/2021", merchant_code: "subway", amount_cents: 5000} ])).toBeInstanceOf(Observable);
  });

});
