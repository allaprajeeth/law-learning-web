import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryReviewerComponent } from './library-reviewer.component';

describe('LibraryReviewerComponent', () => {
  let component: LibraryReviewerComponent;
  let fixture: ComponentFixture<LibraryReviewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryReviewerComponent]
    });
    fixture = TestBed.createComponent(LibraryReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
