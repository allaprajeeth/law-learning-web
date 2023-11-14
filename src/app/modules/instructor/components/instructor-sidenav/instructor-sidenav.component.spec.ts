import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSidenavComponent } from './instructor-sidenav.component';

describe('InstructorSidenavComponent', () => {
  let component: InstructorSidenavComponent;
  let fixture: ComponentFixture<InstructorSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorSidenavComponent]
    });
    fixture = TestBed.createComponent(InstructorSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
