import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberchangepopupComponent } from './numberchangepopup.component';

describe('NumberchangepopupComponent', () => {
  let component: NumberchangepopupComponent;
  let fixture: ComponentFixture<NumberchangepopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberchangepopupComponent]
    });
    fixture = TestBed.createComponent(NumberchangepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
