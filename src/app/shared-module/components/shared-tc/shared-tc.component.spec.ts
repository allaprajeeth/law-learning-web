import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTCComponent } from './shared-tc.component';

describe('SharedTCComponent', () => {
  let component: SharedTCComponent;
  let fixture: ComponentFixture<SharedTCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedTCComponent]
    });
    fixture = TestBed.createComponent(SharedTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
