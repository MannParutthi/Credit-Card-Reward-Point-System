import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from './reward-points-calculator-services.model';

@Injectable({
  providedIn: 'root'
})
export class RewardPointsCalculatorService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getRewardPoints(transactionsList: TransactionModel[]): Observable<CalculateRewardsPointsResponse> {
    let uri = "calculateRewardPoints"
    return this.http.post(`${this.baseUrl}/${uri}` , transactionsList) as Observable<CalculateRewardsPointsResponse>;
  }
}


export interface CalculateRewardsPointsResponse {
  rewardPoints: String | Number,
  rulesApplied: Object
}
