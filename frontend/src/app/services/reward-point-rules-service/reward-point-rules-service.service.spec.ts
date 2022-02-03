import { TestBed } from '@angular/core/testing';

import { RewardPointRulesServiceService } from './reward-point-rules-service.service';

describe('RewardPointRulesServiceService', () => {
  let service: RewardPointRulesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardPointRulesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
