import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedcourseInfoComponent } from './sharedcourse-info.component';

describe('SharedcourseInfoComponent', () => {
  let component: SharedcourseInfoComponent;
  let fixture: ComponentFixture<SharedcourseInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedcourseInfoComponent]
    });
    fixture = TestBed.createComponent(SharedcourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
