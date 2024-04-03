import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvicerimageComponent } from './advicerimage.component';

describe('AdvicerimageComponent', () => {
  let component: AdvicerimageComponent;
  let fixture: ComponentFixture<AdvicerimageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvicerimageComponent]
    });
    fixture = TestBed.createComponent(AdvicerimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
