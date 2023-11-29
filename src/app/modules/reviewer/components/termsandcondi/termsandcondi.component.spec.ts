import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandcondiComponent } from './termsandcondi.component';

describe('TermsandcondiComponent', () => {
  let component: TermsandcondiComponent;
  let fixture: ComponentFixture<TermsandcondiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsandcondiComponent]
    });
    fixture = TestBed.createComponent(TermsandcondiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
