import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedCoursesOverviewComponent } from './commented-courses-overview.component';

describe('CommentedCoursesOverviewComponent', () => {
  let component: CommentedCoursesOverviewComponent;
  let fixture: ComponentFixture<CommentedCoursesOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentedCoursesOverviewComponent]
    });
    fixture = TestBed.createComponent(CommentedCoursesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
