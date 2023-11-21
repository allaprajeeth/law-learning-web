import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedaccountsecurityComponent } from './sharedaccountsecurity.component';

describe('SharedaccountsecurityComponent', () => {
  let component: SharedaccountsecurityComponent;
  let fixture: ComponentFixture<SharedaccountsecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedaccountsecurityComponent]
    });
    fixture = TestBed.createComponent(SharedaccountsecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
