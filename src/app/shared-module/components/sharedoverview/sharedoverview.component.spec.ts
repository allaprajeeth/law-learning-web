import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedoverviewComponent } from './sharedoverview.component';

describe('SharedoverviewComponent', () => {
  let component: SharedoverviewComponent;
  let fixture: ComponentFixture<SharedoverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedoverviewComponent]
    });
    fixture = TestBed.createComponent(SharedoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
