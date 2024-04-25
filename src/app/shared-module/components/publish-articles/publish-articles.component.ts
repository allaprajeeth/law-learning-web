import { Component} from '@angular/core';
import { Article } from '../fetcharticle.model';
import { ActivatedRoute } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
import { Ratings } from 'src/app/common/models/rating.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-publish-articles',
  templateUrl: './publish-articles.component.html',
  styleUrls: ['./publish-articles.component.scss']
})
export class PublishArticlesComponent  {

  articleId : number | undefined;
  articleDetails: Article | null = null;
  loading = false;
  error: string | null = null;
  fileId: any;
  storedFileContent: string | undefined;
  isSubscriber: boolean;
  stars: number[] | undefined;
  cangiverating:boolean=false;
  selectedRating = 0;
  userComments: string = '';
  isratingEditable:boolean=true;
  reviews:Ratings[] = [];
  editGivenReviews =false
  editUserArtcileId:number|undefined
  emailId: string | undefined 
  isreviewGiven:boolean|undefined
  isReviewsAvailable:boolean|undefined
  officeViewerSrc: SafeResourceUrl | string | undefined;
  fileOpened: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fetcharticle: FetcharticlesService,
    private http: HttpClient,
    public dialog: MatDialog,
    private location: Location,
    private authService: AuthTokenService,
    private sanitizer: DomSanitizer
  ) {
    this.stars = Array(5).fill(0).map((_, i) => i + 1);
    const userDetails = this.authService.getUserDetails();
    if (userDetails ) {
    this.emailId= userDetails.email
    console.log(this.emailId)
    }
    this.isSubscriber= userDetails?.role === 'SUBSCRIBER';
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      this.articleId  = +params!;
    }
    )
  }
  ngOnInit(): void {
      if (this.articleId !== null) {
        console.log('Article ID:', this.articleId);
        this.loadArticleDetails();
        this.getReviewRating()
      } else {
        console.error('Article ID is null or undefined');
      }
    
  }
  goBack() {
    this.location.back();
  }
  selectRating(r: any) {
    if(this.isratingEditable){
    this.selectedRating = r;
    }
  }
  submitReview() {
    if (this.articleId !== undefined) {
    this.submitReviewRating(this.articleId,this.selectedRating,this.userComments)
    this.ratingClicked()
    }
  }
  getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
  ratingClicked(){
   this.isratingEditable=false;
  }
  giveReview(){
    this.cangiverating=true;
  }
  leaveRatingClose() {
    this.cangiverating = false;
    this.editGivenReviews=false  
  }
  editUserReview(review:any){
    this.editGivenReviews=true
    this.selectedRating = review.rating;
    this.userComments = review.comments;
    this.editUserArtcileId=review.id
   }
   openFile(fileUrl?: string): void {
    if (fileUrl) {
      const downloadUrl = endPoints.s3BaseURL + fileUrl;
      console.log(fileUrl);

      const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        downloadUrl
      )}`;
      const safeUrl: SafeResourceUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(officeViewerUrl);
      this.officeViewerSrc = safeUrl;
      this.fileOpened = true;
    } else {
      console.error('File URL is undefined.');
    }
  }

  loadArticleDetails(): void {
    this.loading = true;
    this.error = null;
    if (this.articleId !== undefined) {
      this.fetcharticle.getArticleDetails(this.articleId).subscribe(
        (response) => {
          this.articleDetails = response || null;
          this.openFile(this.articleDetails?.data.files[0]?.url);
        },
        (error) => {
          console.error('Error fetching article details:', error);
        }
      ).add(() => {
        this.loading = false;
      });
    } else {
      console.error('Article ID is null or undefined');
    }
  }
  submitReviewRating(articleId: number, rating: number, review: string) {
    const body = {
      rating: rating,
      comments: review
    };
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl =baseUrl +`/reviews/articles/${articleId}` 
  
    this.http.post(apiUrl,body).subscribe(
      () => {
        console.log('Rating given successfully');
        this.cangiverating = false;
        
      },
      (error) => {
        console.error('Error deleting rating:', error);
      }
    );

  }
  getReviewRating() {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/reviews/articles/${this.articleId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.reviews = response.data?.content;
        if (this.reviews && this.reviews.length > 0) {
        this.reviews.forEach(review => {
          review.editRating = review.user.email === this.emailId;
          this.isreviewGiven=true
          this.isReviewsAvailable= true
        });
      }else {
        this.isReviewsAvailable= false
      }
    },
      (error) => {
        console.error('Error loading reviews:', error);
      }
    );
  }

 
  

  
}


