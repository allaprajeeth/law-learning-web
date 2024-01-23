import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReport2Component } from './audit-report2.component';

describe('AuditReport2Component', () => {
  let component: AuditReport2Component;
  let fixture: ComponentFixture<AuditReport2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditReport2Component]
    });
    fixture = TestBed.createComponent(AuditReport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
