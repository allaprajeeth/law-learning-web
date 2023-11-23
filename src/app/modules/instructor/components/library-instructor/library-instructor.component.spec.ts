import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryInstructorComponent } from './library-instructor.component';

describe('LibraryInstructorComponent', () => {
  let component: LibraryInstructorComponent;
  let fixture: ComponentFixture<LibraryInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryInstructorComponent]
    });
    fixture = TestBed.createComponent(LibraryInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
