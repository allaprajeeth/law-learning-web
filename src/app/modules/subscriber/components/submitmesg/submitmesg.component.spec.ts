import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitmesgComponent } from './submitmesg.component';

describe('SubmitmesgComponent', () => {
  let component: SubmitmesgComponent;
  let fixture: ComponentFixture<SubmitmesgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitmesgComponent]
    });
    fixture = TestBed.createComponent(SubmitmesgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
