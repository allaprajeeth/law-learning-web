
import { Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import * as Plyr from 'plyr';
import { PdfService } from 'src/app/sharedService.service';
import { CourseService } from 'src/app/common/services/course.service';
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent {
  @Input() course: any;
  
  isTestAvailable:boolean;
  nextVideoInfo: { sectionIndex: number; videoIndex: number } | undefined;
  @ViewChildren(MatExpansionPanel) expansionPanels!: QueryList<MatExpansionPanel>;
  @ViewChild('videocontainer') videoContainer!: ElementRef;
  @ViewChild('videotextContainer') videoTextContainer!: ElementRef;
  sidebarVisible = true;
  currentVideoIndex: number = 0;
  currentSectionIndex: number = 0;
  currentsubSectionIndex: number = 0;
  currentVideoTime: number = 0;
  autoplayVideo: boolean = false;
  showNextButton: boolean = false;
  player: Plyr | undefined;
  completedVideoCount = 0;
  totalCourseDuration: number = 0;
  totalWatchedTime: number = 0;
  courseProgress: number = 0;
  currentPlayingVideoIndex: number = -1;
  documents:boolean=false;
  isCoursePublished: boolean = false;
  duration: number | undefined;
  showDocs(){
    this.documents=!this.documents;
  }
  pdfUrl='assets/Java.pdf'
  videoGroups: any[] = new Array(15).fill(null).map((_, i) => ({
    panelTitle: `Section ${i + 1}`,
    videos: [
      {
        url: 'assets/video2.mp4',
        selected: false,
        title: `${i + 1}.1 Introduction`,
        time: '1min',
      },
      {
        url: 'assets/video3.mp4',
        selected: false,
        title: `${i + 1}.2 Hands-On Practice`,
        time: '9min',
      },
      {
        url: 'assets/video1.mp4',
        selected: false,
        title: `${i + 1}.3. Let's get started`,
        time: '2min',
      },
    ],
  }));
  currentVideoSource: string = this.videoGroups[this.currentVideoIndex].videos[0].url;
  constructor(
    private renderer: Renderer2, 
    private el: ElementRef ,
    private testService:PdfService,
    private courseService: CourseService) {
    this.testService.setIsTestAvailable(true);
    this.isTestAvailable = this.testService.isTestAvailable; 
  }

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
      title: '1.1 Introduction',
      resourceUrl: '',
    },
    {
      title: '2.2 Hands-On Practice',
      resourceUrl: '',
    },
  ];
 
  
  ngOnInit() {
    this.initializePlayer();
    this.setupPlayerEventListeners();
    this.retrieveTotalWatchedTimeFromLocalStorage();
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
      this.playVideo(sectionIndex, videoIndex);
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
  getTotalWatchedTimeInHours(): string {
    const totalWatchedHours = Math.floor(this.totalWatchedTime / 3600);
    const totalWatchedMinutes = Math.floor((this.totalWatchedTime % 3600) / 60);
    const watchedTimeFormatted = `${totalWatchedHours}h ${totalWatchedMinutes}m`;

    localStorage.setItem('totalWatchedTime', JSON.stringify(this.totalWatchedTime));
  
    return watchedTimeFormatted;
  }
  retrieveTotalWatchedTimeFromLocalStorage() {
    const totalWatchedTimeJson = localStorage.getItem('totalWatchedTime');
    if (totalWatchedTimeJson) {
      this.totalWatchedTime = JSON.parse(totalWatchedTimeJson);
    }
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
  
   handleVideoEnded() {
    this.showNextButton = true; 
    this.markVideoAsCompleted();
    //this.playNextVideo();
    localStorage.setItem('completedStatus', JSON.stringify(this.videoGroups));
  }

   markVideoAsCompleted() {
    const video = this.videoGroups[this.currentSectionIndex].videos[this.currentVideoIndex];
    if (!video.selected) {
      video.selected = true;
      this.completedVideoCount = this.videoGroups.reduce((count, section) => {
        return count + section.videos.filter((v: any) => v.selected).length;
      }, 0);
      this.updateCourseProgress();
       
    }
  }
  
   playNextVideo() {
    this.showNextButton = false;
    this.currentVideoIndex++;
    if (this.currentVideoIndex >= this.videoGroups[this.currentSectionIndex].videos.length) {
      this.currentSectionIndex++;
      this.currentVideoIndex = 0;
    }
    
   this.playVideo(this.currentSectionIndex, this.currentVideoIndex);
  }

  playVideo(sectionIndex: number, subSectionIndex: number) {
    const section = this.course?.sections[sectionIndex];
    const subSection = section.subSections[subSectionIndex];
    const videoUrl =
      'https://elearning-stagging.s3.ap-south-1.amazonaws.com/' +
      subSection.file.url;
    this.currentSectionIndex = sectionIndex;
    this.currentsubSectionIndex = subSectionIndex;
    console.log(videoUrl);
    if (this.player) {
      this.player.source = {
        type: 'video',
        sources: [
          {
            src: videoUrl,
            type: 'video/mp4',
          },
        ],
      };
      const playPromise = this.player.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            console.log('Video playback started successfully');
          })
          .catch((error) => {
            console.error('Failed to start playback:', error);
          });
      }
    } else {
      console.error('Plyr player is not properly initialized.');
    }
  }
 
  openExpansionPanel(sectionIndex: number) {
    this.expansionPanels.forEach((panel) => panel.close());
    this.expansionPanels.toArray()[sectionIndex].open();
  }

  approveVideo(subSection: any) {
    const courseId = this.course.id;
    const videoInfo = {
      title: subSection.title,
      status: 'APPROVED'
    };
    this.courseService.sendReview(courseId, videoInfo).subscribe(
      response => {
        console.log('Video approved:', response);
        // Update UI or do additional actions
      },
      error => {
        console.error('Error approving video:', error);
      }
    );
  }
  
  
  toggleCommentBox(subSection: any) {
    subSection.showCommentBox = !subSection.showCommentBox;
    if (!subSection.comment) {
      subSection.comment = '';
    }
  }

  sendComment(subSection: any) {
    if (subSection.comment) {
      const courseId = this.course.id;
      const videoInfo = {
        title: subSection.title,
        comment: subSection.comment,
        status: 'REJECTED'
      };
      
      this.courseService.sendReview(courseId, videoInfo).subscribe(
        response => {
          console.log('Comment sent:', response);
          // Update UI or do additional actions
        },
        error => {
          console.error('Error sending comment:', error);
        }
      );
  
      subSection.showCommentBox = false;
    }
  }
  
 
}
