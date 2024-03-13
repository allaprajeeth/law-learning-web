import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHistoryComponent } from './course-history.component';

describe('CourseHistoryComponent', () => {
  let component: CourseHistoryComponent;
  let fixture: ComponentFixture<CourseHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseHistoryComponent]
    });
    fixture = TestBed.createComponent(CourseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
