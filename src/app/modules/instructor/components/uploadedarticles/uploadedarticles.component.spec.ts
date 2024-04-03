import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedarticlesComponent } from './uploadedarticles.component';

describe('UploadedarticlesComponent', () => {
  let component: UploadedarticlesComponent;
  let fixture: ComponentFixture<UploadedarticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedarticlesComponent]
    });
    fixture = TestBed.createComponent(UploadedarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
