import {Component, ElementRef,Input,QueryList,Renderer2,ViewChild,ViewChildren,} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import * as Plyr from 'plyr';
import { Course } from 'src/app/common/models/course.model';
import { PdfService } from 'src/app/sharedService.service';
import { Section } from '../../../../common/models/section.model';
 
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss'],
})
export class VideoplayerComponent {
  @Input() course: Course = new Course();
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
  player: Plyr | undefined;
  courseProgress: number = 0;
  currentPlayingVideoIndex: number = -1;
  documents: boolean = false;
 
  showDocs() {
    this.documents = !this.documents;
  }
  pdfUrl = 'assets/Java.pdf';
  isFreeCourseRoute: boolean | undefined;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private testService: PdfService,
    private route: ActivatedRoute
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
 
 
  playVideo(sectionIndex: number, subSectionIndex: number) {
    const section = this.course.sections[sectionIndex];
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
}
 