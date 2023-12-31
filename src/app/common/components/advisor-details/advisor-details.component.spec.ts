import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDetailsComponent } from './advisor-details.component';

describe('AdvisorDetailsComponent', () => {
  let component: AdvisorDetailsComponent;
  let fixture: ComponentFixture<AdvisorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvisorDetailsComponent]
    });
    fixture = TestBed.createComponent(AdvisorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
