
import {Component, ElementRef,Input,QueryList,Renderer2,ViewChild,ViewChildren,} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import * as Plyr from 'plyr';
// import { Course } from 'src/app/common/models/course.model';
import { Course } from 'src/app/common/models/course.model';
import { PdfService } from 'src/app/sharedService.service';
import { Section } from 'src/app/common/models/section.model';
import { NgModel } from '@angular/forms';
import { CourseService } from 'src/app/common/services/course.service';
import { SubSection } from 'src/app/common/models/sub-sections.model';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
import { UserRole } from 'src/app/common/enums/role.enums';
import { ReviewStatus } from 'src/app/common/enums/status.enums';
import { MatSnackBar } from '@angular/material/snack-bar';
import { endPoints } from 'src/app/common/constants/endpoints';

@Component({
  selector: 'app-videoplayer-subscriber',
  templateUrl: './videoplayer-subscriber.component.html',
  styleUrls: ['./videoplayer-subscriber.component.scss']
})
export class VideoplayerSubscriberComponent {

  @Input() course: Course | undefined | null;

  // @Input() course: Course | undefined | null;
  // @Input() course: Course = new Course();
  isTestAvailable: boolean;
  nextVideoInfo: { sectionIndex: number; subSectionIndex: number } | undefined;
  @ViewChildren(MatExpansionPanel)
  expansionPanels!: QueryList<MatExpansionPanel>;
  @ViewChild('videocontainer') videoContainer!: ElementRef;
  @ViewChild('videotextContainer') videoTextContainer!: ElementRef;
  sidebarVisible = true;
  currentsubSectionIndex: number = 0;
  currentSectionIndex: number = 0;
  autoplayVideo: boolean = false;
  showNextButton: boolean = false;
  private player: Plyr | undefined;
  courseProgress: number = 0;
  currentPlayingVideoIndex: number = -1;
  documents: boolean = false;
  noVideoMessage: string = '';
 
 
  showDocs() {
    this.documents = !this.documents;
  }
  pdfUrl = 'assets/Java.pdf';
  isFreeCourseRoute: boolean | undefined;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private testService: PdfService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthTokenService,
    private snackBar: MatSnackBar
  ) {
    this.testService.setIsTestAvailable(true);
    this.isTestAvailable = this.testService.isTestAvailable;
    this.route.url.subscribe((segments) => {
      this.isFreeCourseRoute = segments.some(
        (segment) => segment.path === 'freecourse'
      );
    });
  }
 
  isVideoPlaying(sectionIndex: number, videoIndex: number): boolean {
    return (
      sectionIndex === this.currentSectionIndex &&
      videoIndex === this.currentsubSectionIndex
    );
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    if (!this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '195px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '120px');
    }
  }
 
  openSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const videoContainerElement = this.videoContainer?.nativeElement;
    if (this.sidebarVisible) {
      this.renderer.setStyle(videoContainerElement, 'margin-left', '0px');
      this.renderer.setStyle(videoContainerElement, 'margin-right', '0px');
    }
  }
 
 
  ngOnInit() {
    this.initializePlayer();
    this.setupPlayerEventListeners();
   
  }
  private setupPlayerEventListeners() {
    if (this.player) {
      this.player.on('ended', () =>  this.showNextButton = true );
    }
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
 
  getDownloadUrl(fileUrl: string): string {
    return `${endPoints.baseURL}/downloadFile?path=${encodeURIComponent(fileUrl)}`;
  }
 

  // getReviewStatusColor(status?: string): string {
  //   if (!status) {
  //     return 'blue'; 
  //   }
  //   switch (status) {
  //     case 'SUBMITTED':
  //       return 'grey';
  //     case 'CONTENT_MANAGER_ACCEPTED':
  //     case 'ADMIN_ACCEPTED':
  //     case 'REVIEWER_ACCEPTED':
  //       return 'green';
  //     case 'CONTENT_MANAGER_REJECTED':
  //     case 'ADMIN_REJECTED':
  //     case 'REVIEWER_REJECTED':
  //       return 'red';
  //     default:
  //       return 'blue';
  //   }
  // }


  playVideo(sectionIndex: number, subSectionIndex: number) {
    const section = this.course!.sections[sectionIndex];
    const subSection = section.subSections[subSectionIndex];
    if (subSection && subSection.file && subSection.file.url) {
    const videoUrl =
      'https://elearning-stagging.s3.ap-south-1.amazonaws.com/' +
      subSection.file.url;
    this.currentSectionIndex = sectionIndex;
    this.currentsubSectionIndex = subSectionIndex;
    console.log(videoUrl);
  
    if (videoUrl) {
      this.noVideoMessage = ''; 
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
    } else {
      this.noVideoMessage = 'No video file is uploaded';
      if (this.player) {
        this.player.stop();
        this.player.poster = '';
      }
    }
  } else {
    console.error('Video URL is undefined or null.');
  }
  }
  

  isVideoAvailable(): boolean {
    if (this.course && this.course.sections[this.currentSectionIndex]?.subSections[this.currentsubSectionIndex]?.file) {
      return this.course && this.course.sections[this.currentSectionIndex]?.subSections[this.currentsubSectionIndex]?.file &&
      this.course.sections[this.currentSectionIndex].subSections[this.currentsubSectionIndex].file.contentType === 'video/mp4';
    }
    return false;
  }
  openExpansionPanel(sectionIndex: number) {
    this.expansionPanels.forEach((panel) => panel.close());
    this.expansionPanels.toArray()[sectionIndex].open();
  }

  // showSubsciptionApprovalSection(subSection: SubSection): boolean {
  //   return this.courseService.showSubsciptionApprovalSection(subSection);
  // }

  // approveVideo(section: Section, subSection: SubSection, status: string) {
  //   const courseId = this.course?.id;
  
  //   const body = {
  //     sectionId: section.id,
  //     subSectionId: subSection.id,
  //     status: status,
  //     summary: ''
  //   };
    
  //   this.courseService.sendReview(String(courseId), body).subscribe(
  //     response => {
  //       console.log('Video approved:', response);
  //       this.showSuccessPopup('Course Video approved successfully.');
  //     },
  //     error => {
  //       console.error('Error approving video:', error);
  //     }
  //   );
  //   subSection.reviewStatus = status;
  //   console.log('status',status )
  // }
  
  
  // toggleCommentBox(subSection: any) {
  //   subSection.showCommentBox = !subSection.showCommentBox;
  //   subSection.comment = ''; 
  // }

  // rejectVideo(section: Section, subSection: SubSection, status: string, rejectionComment: string | undefined) {
  //   const courseId = this.course?.id;
  
  //   const body = {
  //     sectionId: section.id,
  //     subSectionId: subSection.id,
  //     status: status,
  //     summary: rejectionComment 
  //   };
  
  //   this.courseService.sendReview(String(courseId), body).subscribe(
  //     response => {
  //       console.log('Video commented:', response);
  //       subSection.reviewStatus = status; 
  //       subSection.showCommentBox = false;
  //       this.showRejectPopup('Course Video commented successfully.');
  //     },
  //     error => {
  //       console.error('Error rejecting video:', error);
  //     }
  //   );
  // }
  

  // showSuccessPopup(message: string) {
  //   this.snackBar.open(message, 'Close', { 
  //     verticalPosition: 'top',
  //     panelClass: ['success-snackbar'] 
  //   });
  // }
  
  // showRejectPopup(message: string) {
  //   this.snackBar.open(message, 'Close', {
  //     verticalPosition: 'top',
  //     panelClass: ['reject-snackbar'] 
  //   });
  // }
}
