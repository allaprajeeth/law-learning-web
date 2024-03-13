import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedcourseHistoryComponent } from './sharedcourse-history.component';

describe('SharedcourseHistoryComponent', () => {
  let component: SharedcourseHistoryComponent;
  let fixture: ComponentFixture<SharedcourseHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedcourseHistoryComponent]
    });
    fixture = TestBed.createComponent(SharedcourseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
