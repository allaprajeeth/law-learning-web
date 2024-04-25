import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/modules/authentication/components/article.service';
import { Article } from '../../models/article.model';
import { FileSaverService } from 'ngx-filesaver';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';
import { NotificationService } from '../../services/notification/notification.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from 'src/app/modules/admin/components/admin.service';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {
  article: Article | undefined;
  fileOpened: boolean = false;
  approvalStatus: 'approved' | 'rejected' |'resubmit' | 'pending' = 'pending';
  comment: string = '';
  commentError: boolean = false;
  articleApproved: boolean = false;
  articleRejected: boolean = false;
  articleee:boolean=true;
  storedFileContent: string | undefined;
  fileButtonVisible: boolean = true;
  officeViewerSrc: SafeResourceUrl | string | undefined;
  resubmitMessage: boolean = false;
  articleId :number | undefined
  isAdmin: boolean = false;
  role:string |undefined

  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private fileSaverService: FileSaverService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient ,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer,
    private adminService: AdminService,
    private authService: AuthTokenService,
 
  ) {
    const userDetails = this.authService.getUserDetails();
    this.isAdmin = userDetails?.role === 'ADMIN';
     this.role = userDetails?.role 
  }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
       this.articleId = +params.get('id')!;
      this.http.get<Article>(`${endPoints.baseURL}/articles/${this.articleId}`).subscribe(
        (artilces: Article) => {
          this.article = artilces.data;
          this.openFile(this.article?.files[0].url)
          console.log(this.article?.files[0].url)
        },
        (error) => {
          console.error('Error fetching article:', error);
        }
      )
    });
  }

  downloadFile(fileUrl?: string, fileName?: string): void {
    this.http.get(`http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`, { responseType: 'blob' })
      .subscribe(
        (data: Blob) => {
          this.fileOpened = true;
          // Create a Blob object and create a download link
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName || 'downloaded-file'; // Specify the file name
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
  }
  
  fetchFileContent(fileUrl?: string): void {
    this.http.get(`http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.storedFileContent = data;
        },
        (error) => {
          console.error('Error fetching file content:', error);
        }
      );
  }

openFile(fileUrl?: string, fileName?: string): void {
  if (fileUrl) {
    const downloadUrl =  endPoints.s3BaseURL + fileUrl;
    console.log(fileUrl)

      const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(downloadUrl)}`;
      const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(officeViewerUrl);
      this.officeViewerSrc = safeUrl;
      this.fileOpened = true;
  } else {
      console.error('File URL is undefined.');
  }
}
 
  ngOnDestroy(): void {
    // Clear article details from local storage when leaving the component
    localStorage.removeItem('articleDetails');
  }
 
 
  goBack(): void {
    this.router.navigate(['/authentication/homepage']);
  }
 
  approveArticle(): void {
    // For now, let's just update the approvalStatus
    this.approvalStatus = 'approved';
    
    this.articleee = false;
  
    // Assuming this.article is defined
    const articleId = this.article?.id;
  
    // Check if the article ID is available
    if (articleId) {
      const articleUrl = endPoints.baseURL + `/secure/articles/review/${articleId}`;
  
      // Modify the request payload according to your API
      const articleData = {
        status: 'APPROVED',
        summary: 'The content is approved.',
      };
  
      // Example headers, adjust accordingly
      const headers = {
        // Add any required headers here
        'Content-Type': 'application/json',
      };
  
      // Make the HTTP POST request with the updated URL
      this.http.patch(articleUrl, articleData, { headers }).subscribe(
        (response) => {
          console.log('Article approval successful:', response);
          this.notificationService.notify('Article approved  successfully');
          this.articleApproved = true;
          // this.router.navigate(['/authentication/homepage']);
          this.articleService.setApprovalResponse(response);
        },
        (error) => {
          console.error('Error approving article:', error);
        }
      );
    } else {
      console.error('Article ID is undefined.');
    }
  }
  
  

 
  rejectArticle(): void {
    if (this.comment.trim() === '') {
      this.commentError = true;
    } else {
      this.commentError = false;
      this.approvalStatus = 'rejected';
    
      this.articleee = false;
  
      // Assuming this.article is defined
      const articleId = this.article?.id;
  
      // Check if the article ID is available
      if (articleId) {
        const articleUrl = `http://192.168.1.42:8080/api/v1/secure/articles/review/${articleId}`;
  
        // Modify the request payload according to your API
        const articleData = {
          status: 'REJECTED',
          summary: this.comment,
        };
  
        // Example headers, adjust accordingly
        const headers = {
          'Content-Type': 'application/json',
        };
  
        // Make the HTTP PATCH request with the updated URL
        this.http.patch(articleUrl, articleData, { headers }).subscribe(
          (response) => {
            console.log('Article rejection successful:', response);
            this.articleRejected = true;
            // this.router.navigate(['/authentication/homepage']);
            this.articleService.setApprovalResponse(response);
            this.articleee = false;
  
          },
          (error) => {
            console.error('Error rejecting article:', error);
          }
        );
      } else {
        console.error('Article ID is undefined.');
      }
    }
  }
  
  closeMessage(): void {
    this.approvalStatus = 'pending'; // Reset approval status to hide the message
  }

  resubmitArticle(): void {
    if (this.comment.trim() === '') {
      this.commentError = true;
    } else {
      this.commentError = false;
      this.approvalStatus = 'resubmit';
      this.articleRejected = false;
      this.articleApproved = false;
      
  
      const articleId = this.articleId;
  
      if (articleId) {
        const articleUrl = endPoints.baseURL +`/secure/articles/review/${articleId}`;
  
        const articleData = {
          status: 'RESUBMIT',
          summary: this.comment,
        };
  
        const headers = {
          'Content-Type': 'application/json',
        };
  
        this.http.patch(articleUrl, articleData, { headers }).subscribe(
          (response) => {
            console.log('Article re-submission successful:', response);
            this.resubmitMessage = true;
            this.adminService.setApprovalResponse(response);
          },
          (error) => {
            console.error('Error re-submitting article:', error);
          }
        );
      } else {
        console.error('Article ID is undefined.');
      }
    }
  }

 
}


