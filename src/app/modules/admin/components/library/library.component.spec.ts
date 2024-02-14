import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibraryComponent } from './library.component';

describe('AdminLibraryComponent', () => {
  let component: AdminLibraryComponent;
  let fixture: ComponentFixture<AdminLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLibraryComponent]
    });
    fixture = TestBed.createComponent(AdminLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
