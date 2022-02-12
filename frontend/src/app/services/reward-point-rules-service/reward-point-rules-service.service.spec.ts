import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RewardPointRulesService } from './reward-point-rules-service.service';

describe('RewardPointRulesService', () => {
  let service: RewardPointRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RewardPointRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
