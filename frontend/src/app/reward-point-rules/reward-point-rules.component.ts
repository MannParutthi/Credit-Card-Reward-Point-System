import { Component, OnInit } from '@angular/core';
import { RewardPointRulesModel } from '../services/reward-point-rules-service/reward-point-rules-service.model';
import { RewardPointRulesService } from '../services/reward-point-rules-service/reward-point-rules-service.service';

@Component({
  selector: 'app-reward-point-rules',
  templateUrl: './reward-point-rules.component.html',
  styleUrls: ['./reward-point-rules.component.scss']
})
export class RewardPointRulesComponent implements OnInit {

  rulesDetails: RewardPointRulesModel;
  merchantEnum = { sportcheck : "Sport Check", tim_hortons : "Tim Hortons", subway : "Subway", others: "Others / Left Over" };

  constructor(private rewardPointRulesService: RewardPointRulesService) { }

  ngOnInit(): void {
    this.getAllRules();
  }

  getAllRules() {
    this.rewardPointRulesService.getRules().subscribe({
      next: (res) => {
        this.rulesDetails = res;
        console.log("rules res => ", res);
      },
      complete: () => {
        console.log("complete => ");
       },
      error: (err) => {
        console.log("err => ", err);
      }
    });
  }

  getmerchantName(merchantCode: String): String {
    //@ts-ignore
    return this.merchantEnum[merchantCode];
  }

}
