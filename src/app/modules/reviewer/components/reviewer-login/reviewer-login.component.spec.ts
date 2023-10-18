import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerLoginComponent } from './reviewer-login.component';

describe('ReviewerLoginComponent', () => {
  let component: ReviewerLoginComponent;
  let fixture: ComponentFixture<ReviewerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewerLoginComponent]
    });
    fixture = TestBed.createComponent(ReviewerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
