import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuspostdetailsComponent } from './statuspostdetails.component';

describe('StatuspostdetailsComponent', () => {
  let component: StatuspostdetailsComponent;
  let fixture: ComponentFixture<StatuspostdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatuspostdetailsComponent]
    });
    fixture = TestBed.createComponent(StatuspostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
