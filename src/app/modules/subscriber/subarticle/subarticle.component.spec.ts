import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubarticleComponent } from './subarticle.component';

describe('SubarticleComponent', () => {
  let component: SubarticleComponent;
  let fixture: ComponentFixture<SubarticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubarticleComponent]
    });
    fixture = TestBed.createComponent(SubarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
