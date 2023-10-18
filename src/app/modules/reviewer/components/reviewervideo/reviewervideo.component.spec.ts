import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewervideoComponent } from './reviewervideo.component';

describe('ReviewervideoComponent', () => {
  let component: ReviewervideoComponent;
  let fixture: ComponentFixture<ReviewervideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewervideoComponent]
    });
    fixture = TestBed.createComponent(ReviewervideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
