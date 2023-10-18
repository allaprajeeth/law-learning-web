import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstnavComponent } from './firstnav.component';

describe('FirstnavComponent', () => {
  let component: FirstnavComponent;
  let fixture: ComponentFixture<FirstnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstnavComponent]
    });
    fixture = TestBed.createComponent(FirstnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
