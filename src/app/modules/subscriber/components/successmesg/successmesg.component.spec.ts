import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessmesgComponent } from './successmesg.component';

describe('SuccessmesgComponent', () => {
  let component: SuccessmesgComponent;
  let fixture: ComponentFixture<SuccessmesgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessmesgComponent]
    });
    fixture = TestBed.createComponent(SuccessmesgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
