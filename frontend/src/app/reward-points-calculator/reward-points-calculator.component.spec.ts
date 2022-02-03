import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPointsCalculatorComponent } from './reward-points-calculator.component';

describe('RewardPointsCalculatorComponent', () => {
  let component: RewardPointsCalculatorComponent;
  let fixture: ComponentFixture<RewardPointsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointsCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
