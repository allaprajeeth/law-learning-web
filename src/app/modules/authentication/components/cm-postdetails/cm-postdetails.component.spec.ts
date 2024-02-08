import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPostdetailsComponent } from './cm-postdetails.component';

describe('CmPostdetailsComponent', () => {
  let component: CmPostdetailsComponent;
  let fixture: ComponentFixture<CmPostdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmPostdetailsComponent]
    });
    fixture = TestBed.createComponent(CmPostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
