import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedvideoplayerComponent } from './sharedvideoplayer.component';

describe('SharedvideoplayerComponent', () => {
  let component: SharedvideoplayerComponent;
  let fixture: ComponentFixture<SharedvideoplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedvideoplayerComponent]
    });
    fixture = TestBed.createComponent(SharedvideoplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
