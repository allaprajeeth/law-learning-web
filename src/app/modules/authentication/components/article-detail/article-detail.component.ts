// article-detail.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { FileSaverService } from 'ngx-filesaver';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoints } from 'src/app/common/api-layer/endpoints';
 
 
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
  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private fileSaverService: FileSaverService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
 
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
 

  openFile(fileUrl?: string, fileName?: string): void {
    if (fileUrl) {
        // Construct the download URL with the fileUrl
        const downloadUrl = endPoints.baseURL + `/downloadFile?path=${fileUrl}`;

        // Fetch the file content
        this.articleService.getFileContent(downloadUrl).subscribe(
            (fileContent: string) => {
                // Set the fileOpened flag to true
                this.fileOpened = true;

                // Do something with the file content (e.g., store it in a variable)
                // For demonstration purposes, let's assume there's a property called 'storedFileContent'
                this.storedFileContent = fileContent;

                // Alternatively, you can display the content directly in the component's template
                // by binding it to an HTML element (e.g., <p>{{ storedFileContent }}</p>)
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
    // Show success message using MatSnackBar
  
    // Additional logic for article approval goes here
  
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
    this.articleee=false;
    }
    // Additional logic for article rejection goes here
    // For now, let's just update the approvalStatus
    // this.approvalStatus = 'rejected';
   
 
  }
  closeMessage(): void {
    this.approvalStatus = 'pending'; // Reset approval status to hide the message
  }
 
}