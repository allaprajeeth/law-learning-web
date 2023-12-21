import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCoursesOverviewComponent } from './approved-courses-overview.component';

describe('ApprovedCoursesOverviewComponent', () => {
  let component: ApprovedCoursesOverviewComponent;
  let fixture: ComponentFixture<ApprovedCoursesOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedCoursesOverviewComponent]
    });
    fixture = TestBed.createComponent(ApprovedCoursesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
