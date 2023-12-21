import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedCoursesInfoComponent } from './commented-courses-info.component';

describe('CommentedCoursesInfoComponent', () => {
  let component: CommentedCoursesInfoComponent;
  let fixture: ComponentFixture<CommentedCoursesInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentedCoursesInfoComponent]
    });
    fixture = TestBed.createComponent(CommentedCoursesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
