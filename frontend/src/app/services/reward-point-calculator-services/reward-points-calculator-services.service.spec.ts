import { TestBed } from '@angular/core/testing';

import { RewardPointsCalculatorServicesService } from './reward-points-calculator-services.service';

describe('RewardPointsCalculatorServicesService', () => {
  let service: RewardPointsCalculatorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardPointsCalculatorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
