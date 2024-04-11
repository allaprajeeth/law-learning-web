import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-subscriberpostdetails',
  templateUrl: './subscriberpostdetails.component.html',
  styleUrls: ['./subscriberpostdetails.component.scss']
})
export class SubscriberpostdetailsComponent {
  courseReviewerHeading_1 = "David Wilson";
  courseReviewerText_1 = "The Law Learning course provided a comprehensive overview of legal principles and their practical applications. The content was well-structured, and the instructors were highly knowledgeable.";
  stars: number[];
  giverating:boolean=false;
  submittedReview:boolean=false;
  showRating = false;
  selected = 0;
  userReview: string = '';
  isratingEditable:boolean=true;
  dynamicRating: number;
  constructor() {
     this.dynamicRating = 3; 
    this.stars = Array(5).fill(0).map((_, i) => i + 1);
  }
  updaterating(r: any) {
    if(this.isratingEditable){
    this.selected = r;
    }
  }
  submitRating() {
    console.log('Selected Rating:', this.selected);
    console.log('User Review:', this.userReview);
    this.ratingClicked()
    this.showRating = false;
    this.submittedReview=true
  }
  getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
  ratingClicked(){
   this.isratingEditable=false;
  }
  giveRating(){
    this.giverating=true;
  }
  leaveRatingClose() {
    this.giverating = false;  
  }
  
  

  
}
