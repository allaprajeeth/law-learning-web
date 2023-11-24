import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorpostdetailsComponent } from './instructorpostdetails.component';

describe('InstructorpostdetailsComponent', () => {
  let component: InstructorpostdetailsComponent;
  let fixture: ComponentFixture<InstructorpostdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorpostdetailsComponent]
    });
    fixture = TestBed.createComponent(InstructorpostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
