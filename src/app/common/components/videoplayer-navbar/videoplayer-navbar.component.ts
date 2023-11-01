import { Component } from '@angular/core';
import { PdfService } from 'src/app/pdf.service';

@Component({
  selector: 'app-videoplayer-navbar',
  templateUrl: './videoplayer-navbar.component.html',
  styleUrls: ['./videoplayer-navbar.component.scss']
})
export class VideoplayerNavbarComponent {
  constructor(private testService: PdfService) {}
  showPopup: boolean = false;
  isProgress = false;
  isShareable = false;
  showRating = false;
  yourProgress=false;
  stars = [1, 2, 3, 4, 5];
  selected = 0;
  isMore: boolean = false; 
  userReview: string = '';
  

  ngOnInit() {
    const storedRating = localStorage.getItem('userRating');
    this.selected = storedRating ? parseInt(storedRating, 10) : 0; // Retrieve and set the rating
  }
  togglemoreClose() {
    this.isMore = !this.isMore;
  }
  
  togglemoreOpen() {
    this.isMore = !this.isMore;
  }
  leaveRatingOpen() {
    this.showRating = true;
  }
  leaveRatingClose() {
    this.showRating = false;  
  }
  yourProgressOpen() {
    this.yourProgress = !this.yourProgress;
  }
  yourProgressClose(){
    this.yourProgress=!this.yourProgress
  }
  updaterating(r: any) {
    this.selected = r;
    localStorage.setItem('userRating', r.toString());
  }
  submitRating() {
    
    console.log('Selected Rating:', this.selected);
    console.log('User Review:', this.userReview);

  
   // this.selected = 0;
    this.userReview = '';
    this.showRating = false;
  }
}