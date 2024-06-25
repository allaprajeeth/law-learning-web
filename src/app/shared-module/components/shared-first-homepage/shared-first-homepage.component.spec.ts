import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFirstHomepageComponent } from './shared-first-homepage.component';

describe('SharedFirstHomepageComponent', () => {
  let component: SharedFirstHomepageComponent;
  let fixture: ComponentFixture<SharedFirstHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedFirstHomepageComponent]
    });
    fixture = TestBed.createComponent(SharedFirstHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
