import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpostdetailsComponent } from './sharedpostdetails.component';

describe('SharedpostdetailsComponent', () => {
  let component: SharedpostdetailsComponent;
  let fixture: ComponentFixture<SharedpostdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedpostdetailsComponent]
    });
    fixture = TestBed.createComponent(SharedpostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
