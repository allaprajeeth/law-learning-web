import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedarticleComponent } from './commentedarticle.component';

describe('CommentedarticleComponent', () => {
  let component: CommentedarticleComponent;
  let fixture: ComponentFixture<CommentedarticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentedarticleComponent]
    });
    fixture = TestBed.createComponent(CommentedarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
