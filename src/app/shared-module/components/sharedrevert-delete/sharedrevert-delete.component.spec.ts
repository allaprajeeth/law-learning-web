import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedrevertDeleteComponent } from './sharedrevert-delete.component';

describe('SharedrevertDeleteComponent', () => {
  let component: SharedrevertDeleteComponent;
  let fixture: ComponentFixture<SharedrevertDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedrevertDeleteComponent]
    });
    fixture = TestBed.createComponent(SharedrevertDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
