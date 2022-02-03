import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardPointRulesService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getRules(): Observable<any> {
    let uri = "getRules";
    return this.http.get(`${this.baseUrl}/${uri}`);
  }
}
