import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreecourseComponent } from './freecourse.component';

describe('FreecourseComponent', () => {
  let component: FreecourseComponent;
  let fixture: ComponentFixture<FreecourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreecourseComponent]
    });
    fixture = TestBed.createComponent(FreecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
