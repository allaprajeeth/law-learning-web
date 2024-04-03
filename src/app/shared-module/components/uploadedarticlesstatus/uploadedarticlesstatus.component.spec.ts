import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedarticlesstatusComponent } from './uploadedarticlesstatus.component';

describe('UploadedarticlesstatusComponent', () => {
  let component: UploadedarticlesstatusComponent;
  let fixture: ComponentFixture<UploadedarticlesstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedarticlesstatusComponent]
    });
    fixture = TestBed.createComponent(UploadedarticlesstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
