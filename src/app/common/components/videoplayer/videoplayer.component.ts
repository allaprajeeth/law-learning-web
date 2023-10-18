import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as Plyr from 'plyr';


@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent {
  @ViewChild('videocontainer') videoContainer!: ElementRef;
  @ViewChild('videotextContainer')videoTextContainer!:ElementRef;
  showNextVideoMessage = false;
  messageTimeout: any;
  currentVideoSource = '';
  inputVideo: string = '';
  hasClicked: boolean = false;
  autoplayVideo: boolean = true;
  public player: Plyr | undefined;
  currentVideoIndex = 0;
  currentSectionIndex = 0;
  cuurentVideo: string = '';
  sidebarVisible = true;
  totalProgress: number = 80;

  videoGroups: any[] = new Array(15).fill(null).map((_, i) => ({
    panelTitle: `Section ${i + 1}`,
    videos: [
      {
        url: 'assets/video2.mp4',
        selected: false,
        title: '1. Introduction',
        time: '1min',
      },
      {
        url: 'assets/sample.mp4',
        selected: false,
        title: '2. Hands-On Practice',
        time: '2min',
      },
      {
        url: 'assets/video1.mp4',
        selected: false,
        title: "3. Let's get started",
        time: '2min',
      },
      {
        url: 'assets/video1.mp4',
        selected: false,
        title: '4. AWS account overview',
        time: '4min',
      },
      // Add more video objects as needed
    ],
  }));
  ngOnInit() {
    // Open the first video when the component is initially loaded
    this.openVideo(0, 0);
  }


  constructor(private renderer: Renderer2, private el: ElementRef) {}
  
  saveVideo(inputVideo: string) {
    this.cuurentVideo = inputVideo;
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    const videoTextContainerElement=this.videoTextContainer?.nativeElement;
    if (!this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '210px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '180px');
      this.renderer.setStyle(videoTextContainerElement, 'width', '1000px');
      this.renderer.setStyle(videoTextContainerElement, 'margin', '0 auto');

    }

  }
  openSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    const videoTextContainerElement=this.videoTextContainer?.nativeElement;
    if (this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '60px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '60px');
      this.renderer.setStyle(videoTextContainerElement, 'width', '66%');
      this.renderer.setStyle(videoTextContainerElement, 'margin-left', '25%');
    }
  }
  openVideo(sectionIndex: number, videoIndex: number) {
    clearTimeout(this.messageTimeout);
    this.showNextVideoMessage = false;
    this.currentVideoSource = '/' + this.videoGroups[sectionIndex].videos[videoIndex].url;
  }
  

  ngAfterViewInit() {
    this.initializePlayer();
    this.calculateTotalProgress();
  }
  initializePlayer() {
    this.player = new Plyr(this.el.nativeElement.querySelector('#player'), {
      invertTime: false,
      i18n: {
        rewind: 'Rewind 5s',
        fastForward: 'Forward 5s',
      },
      controls: [
        'play-large',
        'play',
        'rewind',
        'fast-forward',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'speed',
        'settings',
        'pip',
        'fullscreen',
        'notes',
        'transcript'
      ],
      settings: ['captions', 'quality', 'speed'],
      captions: {
        active: true,
        language: 'auto',
      },
      speed: {
        selected: 1,
        options: [0.5, 1, 1.25, 1.5, 2, 2.5, 3, 3.5],
      },
    });

    this.player.on('ended', () => {
      this.onVideoEnded();
    });
  }
  onVideoEnded() {
    this.showNextVideoMessage = true;
    this.messageTimeout = setTimeout(() => {
      this.showNextVideoMessage = false;
      this.loadNextVideo(); 
    }, 2000);
  }
  loadNextVideo() {
    
    const nextVideo = this.getNextVideo();
    if (nextVideo) {
      this.currentVideoSource = '/' + nextVideo.url;
      this.currentVideoIndex++; 
      this.calculateTotalProgress();
    }
  }
  calculateTotalProgress() {
    // Calculate the total progress
    const totalVideos = this.videoGroups.reduce(
      (acc, section) => acc + section.videos.length,
      0
    );
    this.totalProgress = (this.currentVideoIndex / totalVideos) * 100;
  
    // Display a message when 70% of videos have been watched
    if (this.totalProgress >= 70) {
      // You can display your message here
      console.log('Congratulations! You have watched 70% of the videos.');
    }
  }
  getNextVideoTitle(): string {
    const nextVideo = this.getNextVideo();
    if (nextVideo) {
      return nextVideo.title;
    }
    return '';
  }
  getNextVideo(): any {
    let currentSection = this.videoGroups[this.currentSectionIndex];
    let nextVideoIndex = this.currentVideoIndex + 1;

    if (currentSection && nextVideoIndex < currentSection.videos.length) {
      return currentSection.videos[nextVideoIndex];
    } else {
      const nextSectionIndex = this.currentSectionIndex + 1;
      if (nextSectionIndex < this.videoGroups.length) {
        return this.videoGroups[nextSectionIndex].videos[0];
      }
    }

    return null;
  }
}
