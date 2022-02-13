import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RewardPointRulesComponent } from './reward-point-rules.component';
import { RewardPointRulesService } from '../services/reward-point-rules-service/reward-point-rules-service.service';
import { RewardPointRulesModel } from '../services/reward-point-rules-service/reward-point-rules-service.model';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('RewardPointRulesComponent', () => {
  let component: RewardPointRulesComponent;
  let fixture: ComponentFixture<RewardPointRulesComponent>;
  let service: RewardPointRulesService;
  let stubValue: RewardPointRulesModel = {rulesListName:"main",rulesListId:1001,rulesList:[{"ruleId":1,"points":500,"conditions":[{"merchantCode":"sportcheck","purchaseAmount":75},{"merchantCode":"tim_hortons","purchaseAmount":25},{"merchantCode":"subway","purchaseAmount":25}]}]};;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointRulesComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useValue: {params: of({selectedRules: 'main'})}}, { provide: RewardPointRulesService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointRulesComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RewardPointRulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(service,"getRules").and.callFake(() => { return of(stubValue); });
    expect(component).toBeTruthy();
  });

  it('getmerchantName happy scenario', () => {
    spyOn(service,"getRules").and.callFake(() => { return of(stubValue); });
    expect(component.getmerchantName("sportcheck")).toBe("Sport Check");
  });

  it('getmerchantName not in enum scenario', () => {
    spyOn(service,"getRules").and.callFake(() => { return of(stubValue); });
    expect(component.getmerchantName("starbucks")).toBeUndefined();
  });

  it('getAllRules', () => {
    spyOn(service,"getRules").and.callFake(() => { return of(stubValue); });
    component.getAllRules('main');
    expect(component.rulesDetails).toBe(stubValue);
  });

  it('getAllRules error', () => {
    spyOn(service,"getRules").and.returnValue(throwError('error'));
    component.getAllRules('any');
    expect(component.rulesDetails).toBeUndefined;
  });

});


describe('RewardPointRulesComponent loaded from URL', () => {
  let component: RewardPointRulesComponent;
  let fixture: ComponentFixture<RewardPointRulesComponent>;
  let service: RewardPointRulesService;
  let stubValue: RewardPointRulesModel = {rulesListName:"main",rulesListId:1001,rulesList:[{"ruleId":1,"points":500,"conditions":[{"merchantCode":"sportcheck","purchaseAmount":75},{"merchantCode":"tim_hortons","purchaseAmount":25},{"merchantCode":"subway","purchaseAmount":25}]}]};;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointRulesComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useValue: {params: of({selectedRules: null}), queryParams: of({selectedRules: 'main'})}}, { provide: RewardPointRulesService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointRulesComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RewardPointRulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(service,"getRules").and.callFake(() => { return of(stubValue); });
    expect(component).toBeTruthy();
  });
});
