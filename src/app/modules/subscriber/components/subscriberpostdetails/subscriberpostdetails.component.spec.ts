import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberpostdetailsComponent } from './subscriberpostdetails.component';

describe('SubscriberpostdetailsComponent', () => {
  let component: SubscriberpostdetailsComponent;
  let fixture: ComponentFixture<SubscriberpostdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriberpostdetailsComponent]
    });
    fixture = TestBed.createComponent(SubscriberpostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
