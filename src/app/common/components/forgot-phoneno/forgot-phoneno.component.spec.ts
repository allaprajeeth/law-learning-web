import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPhonenoComponent } from './forgot-phoneno.component';

describe('ForgotPhonenoComponent', () => {
  let component: ForgotPhonenoComponent;
  let fixture: ComponentFixture<ForgotPhonenoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPhonenoComponent]
    });
    fixture = TestBed.createComponent(ForgotPhonenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
