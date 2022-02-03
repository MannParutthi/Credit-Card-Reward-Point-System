import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPointRulesComponent } from './reward-point-rules.component';

describe('RewardPointRulesComponent', () => {
  let component: RewardPointRulesComponent;
  let fixture: ComponentFixture<RewardPointRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
