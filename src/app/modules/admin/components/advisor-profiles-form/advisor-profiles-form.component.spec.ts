import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorProfilesFormComponent } from './advisor-profiles-form.component';

describe('AdvisorProfilesFormComponent', () => {
  let component: AdvisorProfilesFormComponent;
  let fixture: ComponentFixture<AdvisorProfilesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvisorProfilesFormComponent]
    });
    fixture = TestBed.createComponent(AdvisorProfilesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
