import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedaboutusComponent } from './sharedaboutus.component';

describe('SharedaboutusComponent', () => {
  let component: SharedaboutusComponent;
  let fixture: ComponentFixture<SharedaboutusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedaboutusComponent]
    });
    fixture = TestBed.createComponent(SharedaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
