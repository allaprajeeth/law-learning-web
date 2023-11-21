import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedphotoComponent } from './sharedphoto.component';

describe('SharedphotoComponent', () => {
  let component: SharedphotoComponent;
  let fixture: ComponentFixture<SharedphotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedphotoComponent]
    });
    fixture = TestBed.createComponent(SharedphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
