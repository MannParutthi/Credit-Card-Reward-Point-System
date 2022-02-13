import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CalculateRewardsPointsResponse, RewardPointsCalculatorService } from '../services/reward-point-calculator-services/reward-points-calculator-services.service';

import { RewardPointsCalculatorComponent } from './reward-points-calculator.component';

describe('RewardPointsCalculatorComponent', () => {
  let component: RewardPointsCalculatorComponent;
  let fixture: ComponentFixture<RewardPointsCalculatorComponent>;
  let service: RewardPointsCalculatorService;
  let stubValue: CalculateRewardsPointsResponse = { rewardPoints: 50, rulesApplied: { 2: 50 } };
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RewardPointsCalculatorComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule
      ],
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
    spyOn(service, "getRewardPoints").and.callFake(() => { return of(stubValue); });
    expect(component).toBeTruthy();
  });

  it('calculateRewardPoints', () => {
    spyOn(service, "getRewardPoints").and.callFake(() => { return of(stubValue); });
    component.calculateRewardPoints();
    expect(component.rewardPoints).toBe(50);
  });

  it('calculateRewardPoints', () => {
    spyOn(service, "getRewardPoints").and.returnValue(throwError('error'));
    component.calculateRewardPoints();
    expect(component.rewardPoints).toBe(-1);
  });

  it('checkRules', () => {
    component.checkRules();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/rules', 'main']);
  });

  it('add', () => {
    component.add();
    expect(component.listOfTransactions.length).toBeGreaterThan(0);
  });

});
