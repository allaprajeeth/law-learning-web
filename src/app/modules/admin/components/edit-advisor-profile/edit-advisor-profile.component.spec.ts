import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvisorProfileComponent } from './edit-advisor-profile.component';

describe('EditAdvisorProfileComponent', () => {
  let component: EditAdvisorProfileComponent;
  let fixture: ComponentFixture<EditAdvisorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdvisorProfileComponent]
    });
    fixture = TestBed.createComponent(EditAdvisorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
