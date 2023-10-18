import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructornavComponent } from './instructornav.component';

describe('InstructornavComponent', () => {
  let component: InstructornavComponent;
  let fixture: ComponentFixture<InstructornavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructornavComponent]
    });
    fixture = TestBed.createComponent(InstructornavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
