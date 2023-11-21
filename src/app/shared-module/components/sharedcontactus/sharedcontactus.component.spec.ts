import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedcontactusComponent } from './sharedcontactus.component';

describe('SharedcontactusComponent', () => {
  let component: SharedcontactusComponent;
  let fixture: ComponentFixture<SharedcontactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedcontactusComponent]
    });
    fixture = TestBed.createComponent(SharedcontactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
