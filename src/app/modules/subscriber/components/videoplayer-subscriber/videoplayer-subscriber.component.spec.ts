import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayerSubscriberComponent } from './videoplayer-subscriber.component';

describe('VideoplayerSubscriberComponent', () => {
  let component: VideoplayerSubscriberComponent;
  let fixture: ComponentFixture<VideoplayerSubscriberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoplayerSubscriberComponent]
    });
    fixture = TestBed.createComponent(VideoplayerSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
