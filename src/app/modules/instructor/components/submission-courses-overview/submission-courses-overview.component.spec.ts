import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCoursesOverviewComponent } from './submission-courses-overview.component';

describe('SubmissionCoursesOverviewComponent', () => {
  let component: SubmissionCoursesOverviewComponent;
  let fixture: ComponentFixture<SubmissionCoursesOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmissionCoursesOverviewComponent]
    });
    fixture = TestBed.createComponent(SubmissionCoursesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
