import { Component, ElementRef, Renderer2, ViewChild  } from '@angular/core';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-reviewervideo',
  templateUrl: './reviewervideo.component.html',
  styleUrls: ['./reviewervideo.component.scss']
})
export class ReviewervideoComponent {
  @ViewChild('videocontainer') videoContainer!: ElementRef;
  showNextVideoMessage = false;
  messageTimeout: any;
  currentVideoSource = '';
  inputVideo: string = '';
  hasClicked: boolean = false;
  autoplayVideo: boolean = true;
  private player: Plyr | undefined;
  currentVideoIndex = 0;
  currentSectionIndex = 0;
  cuurentVideo: string = '';
  sidebarVisible = true;
  totalProgress: number = 0;
  reviewrating=false ;
  
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
  enableComments: boolean[][] = new Array(this.videoGroups.length).fill([]).map(() => []);

  constructor(private renderer: Renderer2, private el: ElementRef) {}
  
  saveVideo(inputVideo: string) {
    this.cuurentVideo = inputVideo;
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    if (!this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '210px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '180px');
    }
  }
  ngOnInit() {
    this.openVideo(0, 0);

  }
  openSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    if (this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '60px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '60px');
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
    this.enableComments[this.currentSectionIndex][this.currentVideoIndex] = true;
    this.messageTimeout = setTimeout(() => {
      this.showNextVideoMessage = false;
      this.loadNextVideo(); 
    }, 5000);
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
    reviewercomments=false
    openCommentPopup(){
      this.reviewercomments= !this.reviewercomments;
      this.pauseVideo();
    }
    pauseVideo() {
      this.player?.pause();
    }
    approve(){
      this.reviewercomments=false
    }
    reject(){
        const currentSection = this.videoGroups[this.currentSectionIndex];
        if (currentSection) {
          const currentVideo = currentSection.videos[this.currentVideoIndex];
          if (currentVideo) {
            const panelTitle = currentSection.panelTitle;
            const videoTitle = currentVideo.title;
            const rejectionMessage = `Video in Panel "${panelTitle}" with Title "${videoTitle}" has been rejected.`;
            // this.notificationService.sendNotification(rejectionMessage);
          }
        }
        this.reviewercomments = false;
      }
    textAreaValue: string = '';
    submittedText: string = '';
    stars = [1, 2, 3, 4, 5];
    selected = 0;
    isReviewed:boolean=true;
    review: string = '';
    save() { 
      if (this.textAreaValue.trim() !== '') {
        this.review = this.textAreaValue;
        this.textAreaValue = '';
        this.isReviewed=!this.isReviewed;
      }
      this.player?.play()
    }
    updaterating(r: any) {
      this.selected = r;
    }
}
