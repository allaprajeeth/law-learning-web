import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoursesComponent } from './editcourses.component';

describe('EditcoursesComponent', () => {
  let component: EditcoursesComponent;
  let fixture: ComponentFixture<EditcoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcoursesComponent]
    });
    fixture = TestBed.createComponent(EditcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
