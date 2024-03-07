// article-detail.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { FileSaverService } from 'ngx-filesaver';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';
import { NotificationService } from '../../../../common/services/notification/notification.service'
 
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  fileOpened: boolean = false;
  approvalStatus: 'approved' | 'rejected' | 'pending' = 'pending';
  comment: string = '';
  commentError: boolean = false;
  articleApproved: boolean = false;
  articleRejected: boolean = false;
  articleee:boolean=true;
  storedFileContent: string | undefined;
  fileButtonVisible: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private fileSaverService: FileSaverService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient ,
    private notificationService: NotificationService,
 
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = +params.get('id')!;
      const fileId = params.get('fileId');
 
      const storedArticleDetails = localStorage.getItem('articleDetails');
      this.article = storedArticleDetails ? JSON.parse(storedArticleDetails) : undefined;
 
 
      // If not found in local storage, fetch from the service and store it
      if (!this.article) {
        this.article = this.articleService.getSelectedArticle();
        // Store article details in local storage
        localStorage.setItem('articleDetails', JSON.stringify(this.article));
      }
   
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
        // Construct the download URL with the fileUrl
        const downloadUrl = endPoints.baseURL + `/downloadFile?path=${fileUrl}`;

        // Fetch the file content
        this.articleService.getFileContent(downloadUrl).subscribe(
            (fileContent: string) => {
                // Set the fileOpened flag to true
                this.fileOpened = true;

                
                this.storedFileContent = fileContent;
                this.fileButtonVisible = false;

               
            },
            (error) => {
                console.error('Error fetching file content:', error);
            }
            
        );
        window.open(downloadUrl, '_blank');
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
    this.articleApproved = true;
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
          this.router.navigate(['/authentication/homepage']);
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
      this.articleRejected = true;
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
            this.notificationService.notify('Article rejection successful');
            this.router.navigate(['/authentication/homepage']);
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
 
}