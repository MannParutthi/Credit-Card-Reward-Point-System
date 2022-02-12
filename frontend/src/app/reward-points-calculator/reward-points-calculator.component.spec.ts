import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CalculateRewardsPointsResponse, RewardPointsCalculatorService } from '../services/reward-point-calculator-services/reward-points-calculator-services.service';

import { RewardPointsCalculatorComponent } from './reward-points-calculator.component';

describe('RewardPointsCalculatorComponent', () => {
  let component: RewardPointsCalculatorComponent;
  let fixture: ComponentFixture<RewardPointsCalculatorComponent>;
  let service: RewardPointsCalculatorService;
  let stubValue: CalculateRewardsPointsResponse = {rewardPoints: 50, rulesApplied: {2:50}};
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointsCalculatorComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: RewardPointsCalculatorService }, { provide: Router, useValue: routerSpy }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointsCalculatorComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RewardPointsCalculatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(service,"getRewardPoints").and.callFake(() => { return of(stubValue); });
    expect(component).toBeTruthy();
  });

  it('calculateRewardPoints', () => {
    spyOn(service,"getRewardPoints").and.callFake(() => { return of(stubValue); });
    component.calculateRewardPoints();
    expect(component.rewardPoints).toBe(50);
  });

  it('calculateRewardPoints', () => {
    spyOn(service,"getRewardPoints").and.returnValue(throwError('error'));
    component.calculateRewardPoints();
    expect(component.rewardPoints).toBe(0);
  });

  it('checkRules', () => {
    component.checkRules();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/rules']);
  });

  it('add', () => {
    component.add();
    expect(component.listOfTransactions.length).toBeGreaterThan(0);
  });

});
