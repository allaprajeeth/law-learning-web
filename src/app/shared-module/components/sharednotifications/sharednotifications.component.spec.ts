import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharednotificationsComponent } from './sharednotifications.component';

describe('SharednotificationsComponent', () => {
  let component: SharednotificationsComponent;
  let fixture: ComponentFixture<SharednotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharednotificationsComponent]
    });
    fixture = TestBed.createComponent(SharednotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
