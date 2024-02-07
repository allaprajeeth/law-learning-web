// subscriberpostdetails.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Review {
  reviewerName: string;
  starRating: number;
  comment: string;
}
@Component({
  selector: 'app-subscriberpostdetails',
  templateUrl: './subscriberpostdetails.component.html',
  styleUrls: ['./subscriberpostdetails.component.scss']
})
export class SubscriberpostdetailsComponent implements OnInit{

  articleId: number | null = null;


  submittedReview: boolean = false;
  showRating = false;
  stars = [1, 2, 3, 4, 5];
  selected = 0;
  progress = 60;
  userReview: string = '';
  isratingEditable: boolean = true;
  reviews: Review[] = [];

  leaveRatingOpen() {
    this.showRating = true;
  }

  leaveRatingClose() {
    this.showRating = false;
  }

  updaterating(r: any) {
    if (this.isratingEditable) {
      this.selected = r;
    }
  }

  submitRating() {
    console.log('Selected Rating:', this.selected);
    console.log('User Review:', this.userReview);

    // Save the submitted review to the array
    const newReview: Review = {
      reviewerName: 'User', // You can replace with the actual reviewer name
      starRating: this.selected,
      comment: this.userReview
    };

    this.reviews.push(newReview);

    this.isratingEditable = false;
    this.showRating = false;
    this.submittedReview = true;
  }

  getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

  ratingClicked(i: any) {
    this.isratingEditable = false;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = +params['id'] || null;

      if (this.articleId !== null) {
        // Fetch and display article details based on this.articleId
        // You can call a service method to fetch details or perform any necessary logic.
      } else {
        console.error('Article ID is null or undefined');
      }
    });
  }
}
