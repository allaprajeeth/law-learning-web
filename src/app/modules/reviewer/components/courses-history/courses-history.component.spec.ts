import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHistoryComponent } from './courses-history.component';

describe('CoursesHistoryComponent', () => {
  let component: CoursesHistoryComponent;
  let fixture: ComponentFixture<CoursesHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesHistoryComponent]
    });
    fixture = TestBed.createComponent(CoursesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
