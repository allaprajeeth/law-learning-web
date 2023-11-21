import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitarticlemesgComponent } from './submitarticlemesg.component';

describe('SubmitarticlemesgComponent', () => {
  let component: SubmitarticlemesgComponent;
  let fixture: ComponentFixture<SubmitarticlemesgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitarticlemesgComponent]
    });
    fixture = TestBed.createComponent(SubmitarticlemesgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
