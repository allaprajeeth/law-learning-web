import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCoursesInfoComponent } from './submission-courses-info.component';

describe('SubmissionCoursesInfoComponent', () => {
  let component: SubmissionCoursesInfoComponent;
  let fixture: ComponentFixture<SubmissionCoursesInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmissionCoursesInfoComponent]
    });
    fixture = TestBed.createComponent(SubmissionCoursesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
