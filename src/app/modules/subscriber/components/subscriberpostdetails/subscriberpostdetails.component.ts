import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared-module/components/fetcharticle.model';
import { FetcharticlesService } from 'src/app/shared-module/components/fetcharticles.service';

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
  articleDetails: Article | null = null;
  loading = false;
  error: string | null = null;



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

  constructor(private route: ActivatedRoute,
    private fetcharticle:FetcharticlesService,
    private fetcharticleService: FetcharticlesService,
  private router: Router,
  public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.articleId = +params['id'] || null;
    
        if (this.articleId !== null) {
          console.log('Article ID:', this.articleId);
          this.loadArticleDetails();
        } else {
          console.error('Article ID is null or undefined');
        }
      });
    }
    
    

  loadArticleDetails(): void {
    this.loading = true;
    this.error = null;
  
    if (this.articleId !== null) {
      this.fetcharticle.getArticleDetails(this.articleId).subscribe(
        (response) => {
          this.articleDetails = response || null;
          console.log('Article Details:', this.articleDetails);
        },
        (error) => {
          console.error('Error fetching article details:', error);
          this.error = 'Failed to fetch article details. Please try again later.';
        }
      ).add(() => {
        this.loading = false;
      });
    } else {
      console.error('Article ID is null or undefined');
    }
  }
}
