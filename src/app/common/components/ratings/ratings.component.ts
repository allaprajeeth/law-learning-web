import { Component } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent {
  submittedReview:boolean=false;
  showRating = false;
 
  stars = [1, 2, 3, 4, 5];
  selected = 0;
  progress=60
  userReview: string = '';
  isratingEditable:boolean=true;
  leaveRatingOpen() {
    this.showRating = true;
  }
  leaveRatingClose() {
    this.showRating = false;  
  }

  updaterating(r: any) {
    if(this.isratingEditable){
    this.selected = r;
    }
  }
  submitRating() {
    console.log('Selected Rating:', this.selected);
    console.log('User Review:', this.userReview);
    this.isratingEditable=false;
    this.showRating = false;
    this.submittedReview=true
  }
  getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
  ratingClicked(i:any){
    this.isratingEditable=false;
   }

}
