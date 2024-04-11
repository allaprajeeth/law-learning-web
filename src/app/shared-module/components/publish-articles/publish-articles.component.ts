import { Component, OnInit } from '@angular/core';
import { Article } from '../fetcharticle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { endPoints } from 'src/app/common/constants/endpoints';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';

@Component({
  selector: 'app-publish-articles',
  templateUrl: './publish-articles.component.html',
  styleUrls: ['./publish-articles.component.scss']
})
export class PublishArticlesComponent  implements OnInit{

 articleId: number | null = null;
  articleDetails: Article | null = null;
  loading = false;
  error: string | null = null;
  fileId: any;
  storedFileContent: string | undefined;
  isSubscriber: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetcharticle: FetcharticlesService,
    private fileSaverService: FileSaverService,
    private http: HttpClient,
    public dialog: MatDialog,
    private location: Location,
    private authService: AuthTokenService,
  ) {
    this.dynamicRating = 3; 
    this.stars = Array(5).fill(0).map((_, i) => i + 1);
    const userDetails = this.authService.getUserDetails();
    this.isSubscriber= userDetails?.role === 'SUBSCRIBER';
  }
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
  
          // Move the openFile call here
          this.openFile(this.articleDetails?.data.files[0]?.url, this.articleDetails?.data.files[0]?.fileName);
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
  openFile(fileUrl?: string, fileName?: string): void {
    this.http.get(endPoints.baseURL + `/downloadFile?path=${fileUrl}`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.storedFileContent = data;
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
  }

  fetchFileContent(fileUrl?: string): void {
    this.http.get(endPoints.baseURL + `/downloadFile?path=${fileUrl}`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.storedFileContent = data;
        },
        (error) => {
          console.error('Error fetching file content:', error);
        }
      );
  }

  goBack() {
    this.location.back();
  }

  courseReviewerHeading_1 = "David Wilson";
  courseReviewerText_1 = "The Law Learning course provided a comprehensive overview of legal principles and their practical applications. The content was well-structured, and the instructors were highly knowledgeable.";
  stars: number[] | undefined;
  giverating:boolean=false;
  submittedReview:boolean=false;
  showRating = false;
  selected = 0;
  userReview: string = '';
  isratingEditable:boolean=true;
  dynamicRating: number;
 
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


