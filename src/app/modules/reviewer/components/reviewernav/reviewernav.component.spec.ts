import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewernavComponent } from './reviewernav.component';

describe('ReviewernavComponent', () => {
  let component: ReviewernavComponent;
  let fixture: ComponentFixture<ReviewernavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewernavComponent]
    });
    fixture = TestBed.createComponent(ReviewernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
