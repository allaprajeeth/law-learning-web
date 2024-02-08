import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerPostdetailsComponent } from './reviewer-postdetails.component';

describe('ReviewerPostdetailsComponent', () => {
  let component: ReviewerPostdetailsComponent;
  let fixture: ComponentFixture<ReviewerPostdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewerPostdetailsComponent]
    });
    fixture = TestBed.createComponent(ReviewerPostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
