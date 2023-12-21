import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCoursesInfoComponent } from './approved-courses-info.component';

describe('ApprovedCoursesInfoComponent', () => {
  let component: ApprovedCoursesInfoComponent;
  let fixture: ComponentFixture<ApprovedCoursesInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedCoursesInfoComponent]
    });
    fixture = TestBed.createComponent(ApprovedCoursesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
