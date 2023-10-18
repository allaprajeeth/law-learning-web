import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  editorContent: string = '';
  isDivVisible = false;
  issortBy=false;
  notes: string[] = [];
  isContent=false;
  isButtonClicked: boolean = false;
  isEditing: boolean = false;
  editingIndex: number | null = null;
  videoDuration: string = '0:00';
  toggleDiv() {
    this.isDivVisible = !this.isDivVisible;
  }
  togglesortBy(){
  this.issortBy=!this.issortBy;
  }
 
  createNewDiv() {
    if (!this.isEditing) {
      this.isButtonClicked = true;
      this.isContent = false;
      this.editorContent = ''; // Reset editorContent only when creating a new note
    }
  }

  saveContent() {
    if (this.editorContent.trim() !== '') {
      if (this.isEditing) {
        if (this.editingIndex !== null) {
          this.notes[this.editingIndex] = this.editorContent;
          this.isEditing = false;
          this.editingIndex = null; // Reset editingIndex after saving
        }
      } else {
        this.notes.push(this.editorContent);
      }

      this.isButtonClicked = false;
      this.isContent = true;
    }
  }

  edit(index: number) {
    this.editorContent = this.notes[index];
    this.editingIndex = index;
    this.isButtonClicked = true;
    this.isContent = false;
    this.isEditing = true;
  }

  cancel() {
    this.isButtonClicked = false;
    this.isContent = false;
    this.editorContent = ''; // Reset editorContent when canceling
    this.isEditing = false;
    this.editingIndex = null; // Reset editingIndex when canceling
  }

  delete(index: number) {
    this.notes.splice(index, 1);
    this.isContent = false;
  }

  @ViewChild('durationSpan', { static: false }) durationSpan!: ElementRef;
  @ViewChild(VideoplayerComponent, { static: false }) videoPlayer!: VideoplayerComponent;
   constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.videoPlayer?.player?.on('timeupdate', () => {
      const currentDuration = this.formatDuration(this.videoPlayer?.player?.currentTime || 0);
      this.videoDuration = currentDuration;
      this.cdr.detectChanges();
    });
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
}
