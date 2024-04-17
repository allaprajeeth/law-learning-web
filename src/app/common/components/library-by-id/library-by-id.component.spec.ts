import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryByIdComponent } from './library-by-id.component';

describe('LibraryByIdComponent', () => {
  let component: LibraryByIdComponent;
  let fixture: ComponentFixture<LibraryByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryByIdComponent]
    });
    fixture = TestBed.createComponent(LibraryByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
