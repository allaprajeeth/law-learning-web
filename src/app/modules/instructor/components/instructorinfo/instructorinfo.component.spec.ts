import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorinfoComponent } from './instructorinfo.component';

describe('InstructorinfoComponent', () => {
  let component: InstructorinfoComponent;
  let fixture: ComponentFixture<InstructorinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorinfoComponent]
    });
    fixture = TestBed.createComponent(InstructorinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
