import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardPointRulesComponent } from './reward-point-rules/reward-point-rules.component';
import { RewardPointsCalculatorComponent } from './reward-points-calculator/reward-points-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  { path: 'calculator', component: RewardPointsCalculatorComponent },
  { path: 'rules/:selectedRules', component: RewardPointRulesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
