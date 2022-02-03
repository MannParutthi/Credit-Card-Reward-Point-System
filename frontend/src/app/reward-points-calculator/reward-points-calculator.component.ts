import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionModel } from '../services/reward-point-calculator-services/reward-points-calculator-services.model';
import { CalculateRewardsPointsResponse, RewardPointsCalculatorService } from '../services/reward-point-calculator-services/reward-points-calculator-services.service';

@Component({
  selector: 'app-reward-points-calculator',
  templateUrl: './reward-points-calculator.component.html',
  styleUrls: ['./reward-points-calculator.component.scss']
})
export class RewardPointsCalculatorComponent implements OnInit {

  formGroup: FormGroup;
  listOfTransactions: TransactionModel[] = [];
  rewardPoints: Number = 0;
  rulesApplied = {};

  constructor(
    private formBuilder: FormBuilder,
    private rewardPointsCalculatorService: RewardPointsCalculatorService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'date': [null, []],
      'merchant_code': [null, []],
      'amount_cents': [null, []],
    });
  }

  add() {
    console.log("res ==> ", this.formGroup.getRawValue(), this.formGroup.valid)

    this.listOfTransactions.push(this.formGroup.getRawValue());
    this.formGroup.reset();
  }

  checkRules() {
    this.router.navigate(['/rules']);
  }

  calculateRewardPoints() {
    console.log("listOfTransactions => ", this.listOfTransactions)
    this.rewardPointsCalculatorService.getRewardPoints(this.listOfTransactions).subscribe({
      next: (res: CalculateRewardsPointsResponse) => {
        //@ts-ignore
        this.rewardPoints = Number(res.rewardPoints);
        this.rulesApplied = res.rulesApplied;
        console.log("rewardPoints res => ", res);
      },
      complete: () => {
        console.log("complete => ");
       },
      error: (err) => {
        console.log("err => ", err);
      }
    });
  }

}
