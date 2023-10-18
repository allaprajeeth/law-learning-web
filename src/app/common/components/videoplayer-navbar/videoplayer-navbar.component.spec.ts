import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayerNavbarComponent } from './videoplayer-navbar.component';

describe('VideoplayerNavbarComponent', () => {
  let component: VideoplayerNavbarComponent;
  let fixture: ComponentFixture<VideoplayerNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoplayerNavbarComponent]
    });
    fixture = TestBed.createComponent(VideoplayerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
