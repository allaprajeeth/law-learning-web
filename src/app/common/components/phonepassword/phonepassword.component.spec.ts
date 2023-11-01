import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonepasswordComponent } from './phonepassword.component';

describe('PhonepasswordComponent', () => {
  let component: PhonepasswordComponent;
  let fixture: ComponentFixture<PhonepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhonepasswordComponent]
    });
    fixture = TestBed.createComponent(PhonepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
