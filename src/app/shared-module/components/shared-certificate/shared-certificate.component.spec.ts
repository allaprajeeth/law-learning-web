import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCertificateComponent } from './shared-certificate.component';

describe('SharedCertificateComponent', () => {
  let component: SharedCertificateComponent;
  let fixture: ComponentFixture<SharedCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedCertificateComponent]
    });
    fixture = TestBed.createComponent(SharedCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
