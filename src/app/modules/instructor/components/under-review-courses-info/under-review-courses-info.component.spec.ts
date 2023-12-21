import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderReviewCoursesInfoComponent } from './under-review-courses-info.component';

describe('UnderReviewCoursesInfoComponent', () => {
  let component: UnderReviewCoursesInfoComponent;
  let fixture: ComponentFixture<UnderReviewCoursesInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderReviewCoursesInfoComponent]
    });
    fixture = TestBed.createComponent(UnderReviewCoursesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
