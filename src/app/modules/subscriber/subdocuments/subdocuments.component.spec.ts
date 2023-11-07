import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdocumentsComponent } from './subdocuments.component';

describe('SubdocumentsComponent', () => {
  let component: SubdocumentsComponent;
  let fixture: ComponentFixture<SubdocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubdocumentsComponent]
    });
    fixture = TestBed.createComponent(SubdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
