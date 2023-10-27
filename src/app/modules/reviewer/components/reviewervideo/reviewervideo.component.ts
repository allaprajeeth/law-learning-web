import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren  } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-reviewervideo',
  templateUrl: './reviewervideo.component.html',
  styleUrls: ['./reviewervideo.component.scss']
})
export class ReviewervideoComponent {
  @ViewChildren(MatExpansionPanel) expansionPanels!: QueryList<MatExpansionPanel>;
  @ViewChild('videocontainer') videoContainer!: ElementRef;
  @ViewChild('videotextContainer') videoTextContainer!: ElementRef;
  reviewercomments:boolean=false;
  isDisabled: boolean = true;
  sidebarVisible = true;
  currentVideoIndex: number = 0;
  currentSectionIndex: number = 0;
  currentVideoTime: number = 0;
  autoplayVideo: boolean = false;
  showNextVideoMessage: boolean = false;
  player: Plyr | undefined;
  completedVideoCount = 0;
  totalCourseDuration: number = 0;
  totalWatchedTime: number = 0;
  courseProgress: number = 0;
  currentPlayingVideoIndex: number = -1;
  duration: number | undefined;
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
        url: 'assets/video3.mp4',
        selected: false,
        title: '2. Hands-On Practice',
        time: '9min',
      },
      {
        url: 'assets/video1.mp4',
        selected: false,
        title: "3. Let's get started",
        time: '2min',
      },
    ],
  }));
  enableComments: boolean[][] = new Array(this.videoGroups.length).fill([]).map(() => []);
  
  currentVideoSource: string = this.videoGroups[this.currentVideoIndex].videos[0].url;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  isVideoPlaying(sectionIndex: number, videoIndex: number): boolean {
    return sectionIndex === this.currentSectionIndex && videoIndex === this.currentVideoIndex;
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    const videoTextContainerElement = this.videoTextContainer?.nativeElement;
    if (!this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '230px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '180px');
    }
  }

  openSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    const videoTextContainerElement = this.videoTextContainer?.nativeElement;
    if (this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '60px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '60px');
    }
  }
  resourceData: { title: string; resourceUrl: string }[] = [
    {
      title: '1. Introduction',
      resourceUrl: '',
    },
  ];
 
  
  ngOnInit() {
    this.initializePlayer();
    this.setupPlayerEventListeners();

    const savedVideo = localStorage.getItem('currentVideo');
    console.log(savedVideo)
    const completedStatus = localStorage.getItem('completedStatus');

    if (completedStatus) {
      this.videoGroups = JSON.parse(completedStatus);
      this.calculateCompletedVideoCount(); 
    }
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      this.courseProgress = parseFloat(savedProgress);
    }
    this.calculateTotalCourseDuration();

    if (savedVideo) {
      const { sectionIndex, videoIndex, duration } = JSON.parse(savedVideo);
      this.playVideo(sectionIndex, videoIndex, duration);
    } else {
      this.playVideo(this.currentSectionIndex, this.currentVideoIndex);
    }
  }

  private calculateCompletedVideoCount() {
    this.completedVideoCount = this.videoGroups.reduce((count, section) => {
      return count + section.videos.filter((v: any) => v.selected).length;
    }, 0);
  }

  private initializePlayer() {
    this.player = new Plyr(this.el.nativeElement.querySelector('#player'), {
      invertTime: false,
      autoplay: false,
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
        'speed',
        'settings',
        'pip',
        'fullscreen',
      ],
      settings: ['captions', 'quality', 'speed'],
      speed: {
        selected: 1,
        options: [0.5, 1, 1.25, 1.5, 2, 2.5, 3, 3.5],
      },
    });
  }

  private setupPlayerEventListeners() {
    if (this.player) {
      this.player.on('ended', () => this.handleVideoEnded());
      this.player.on('timeupdate', () => this.handleTimeUpdate());
    }
  }

  private handleTimeUpdate() {
    if (this.player) {
      const sectionIndex = this.currentSectionIndex;
      const videoIndex = this.currentVideoIndex;
      const currentTime = this.player.currentTime;
      const duration = this.player.duration;
      localStorage.setItem('currentVideo', JSON.stringify({ sectionIndex, videoIndex, currentTime, duration }));
    }
  }

  private calculateTotalCourseDuration() {
    this.totalCourseDuration = this.videoGroups.reduce((total, section) => {
      return total + section.videos.reduce((sectionTotal: any, video: any) => {
        return sectionTotal + this.getVideoDurationInSeconds(video);
      }, 0);
    }, 0);
  }

  private updateCourseProgress() {
    this.totalWatchedTime = this.videoGroups.reduce((total, section, sectionIndex) => {
      return total + section.videos.reduce((sectionTotal: number, video: any, videoIndex: any) => {
        if (video.selected) {
          return sectionTotal + this.getVideoDurationInSeconds(video);
        }
        return sectionTotal;
      }, 0);
    }, 0);
    this.courseProgress = Math.floor((this.totalWatchedTime / this.totalCourseDuration) * 100);
    localStorage.setItem('courseProgress', this.courseProgress.toString());
  }

  private getVideoDurationInSeconds(video: any): number {
    const timeString = video.time;
    const matches = timeString.match(/(\d+)\s*(min|sec)?/);
    if (matches) {
      const duration1 = parseInt(matches[1], 10);
      const unit = matches[2];
      if (unit === 'min') {
        return duration1 * 60;
      } else {
        return duration1;
      }
    } else {
      return 0; 
    }
  }

  private handleVideoEnded() {
    this.markVideoAsCompleted();
    this.enableComments[this.currentSectionIndex][this.currentVideoIndex] = true;
    this.playNextVideo();
    localStorage.setItem('completedStatus', JSON.stringify(this.videoGroups));
  }

  private markVideoAsCompleted() {
    const video = this.videoGroups[this.currentSectionIndex].videos[this.currentVideoIndex];
    if (!video.selected) {
      video.selected = true;
      this.completedVideoCount = this.videoGroups.reduce((count, section) => {
        return count + section.videos.filter((v: any) => v.selected).length;
      }, 0);
      this.updateCourseProgress();
    }
  }
  
  private playNextVideo() {
    this.currentVideoIndex++;
    if (this.currentVideoIndex >= this.videoGroups[this.currentSectionIndex].videos.length) {
      this.currentSectionIndex++;
      this.currentVideoIndex = 0;
    }
    
    this.playVideo(this.currentSectionIndex, this.currentVideoIndex,this.player?.duration);
  }

  playVideo(sectionIndex: number, videoIndex: number, duration: number = 0) {
    const video = this.videoGroups[sectionIndex].videos[videoIndex];
    const videoUrl = video.url;
    this.currentSectionIndex = sectionIndex;
    this.currentVideoIndex = videoIndex;
    this.duration=duration
    if (this.player) {
      if (this.player) {
        this.player.source = {
          type: 'video',
          sources: [{
            src: videoUrl,
            type: 'video/mp4',
          }],
        };
        this.player.play();
       
      } else {
        console.error('Plyr source is not properly initialized.');
      }
    } else {
      console.error('Plyr player is not properly initialized.');
    }
    this.openExpansionPanel(sectionIndex);
  }

  openExpansionPanel(sectionIndex: number) {
    this.expansionPanels.forEach((panel) => panel.close());
    this.expansionPanels.toArray()[sectionIndex].open();
  }
  // approve(){

  // }
  // reject(){

  // }
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
  openCommentPopup(){
    this.reviewercomments= !this.reviewercomments;
    this.pauseVideo();
  }
  pauseVideo() {
    this.player?.pause();
  }
  closeComments(){
    this.reviewercomments = false;
  }
  
}

