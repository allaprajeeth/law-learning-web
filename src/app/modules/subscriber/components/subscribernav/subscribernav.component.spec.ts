import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribernavComponent } from './subscribernav.component';

describe('SubscribernavComponent', () => {
  let component: SubscribernavComponent;
  let fixture: ComponentFixture<SubscribernavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribernavComponent]
    });
    fixture = TestBed.createComponent(SubscribernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
