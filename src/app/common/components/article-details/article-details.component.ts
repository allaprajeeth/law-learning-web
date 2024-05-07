import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/modules/authentication/components/article.service';
import { Article } from '../../models/article.model';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';
import { NotificationService } from '../../services/notification/notification.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from 'src/app/modules/admin/components/admin.service';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent {
  article: Article | undefined;
  fileOpened: boolean = false;
  approvalStatus: 'approved' | 'rejected' | 'resubmit' | 'pending' = 'pending';
  comment: string = '';
  commentError: boolean = false;
  articleApproved: boolean = false;
  articleRejected: boolean = false;
  articleee: boolean = true;
  storedFileContent: string | undefined;
  fileButtonVisible: boolean = true;
  officeViewerSrc: SafeResourceUrl | string | undefined;
  resubmitMessage: boolean = false;
  articleId: number | undefined;
  isAdmin: boolean = false;
  role: string | undefined;
  message: string | undefined;
  reviewStatus: string | undefined;

  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private adminService: AdminService,
    private authService: AuthTokenService
  ) {
    const userDetails = this.authService.getUserDetails();
    this.isAdmin = userDetails?.role === 'ADMIN';
    this.role = userDetails?.role;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleId = +params.get('id')!;
      this.http
        .get<Article>(`${endPoints.baseURL}/articles/${this.articleId}`)
        .subscribe(
          (artilces: Article) => {
            this.article = artilces.data;
            this.reviewStatus = this.article?.reviewStatus;
            this.openFile(this.article?.files[0].url);
            console.log(this.article?.files[0].url);
          },
          (error) => {
            console.error('Error fetching article:', error);
          }
        );
    });
  }

  downloadFile(fileUrl?: string, fileName?: string): void {
    const baseUrl = endPoints.baseURL;
    this.http
      .get(`${baseUrl}/downloadFile?path=${fileUrl}`, {
        responseType: 'blob',
      })
      .subscribe(
        (data: Blob) => {
          this.fileOpened = true;
          // Create a Blob object and create a download link
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName || 'downloaded-file';
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
    const baseUrl = endPoints.baseURL;
    this.http
    .get(`${baseUrl}/downloadFile?path=${fileUrl}`, {
        responseType: 'text',
      })
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

  goBack(): void {
    this.router.navigate(['/authentication/homepage']);
  }

  approveArticle(): void {
    this.approvalStatus = 'approved';
    this.articleee = false;
    if (this.articleId) {
      const articleUrl =
        endPoints.baseURL + `/secure/articles/review/${this.articleId}`;
      const articleData = {
        status: 'APPROVED',
        summary: 'The content is approved.',
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      this.http.patch(articleUrl, articleData, { headers }).subscribe(
        (response) => {
          console.log('Article approval successful:', response);
          // this.notificationService.notify('Article approved  successfully');
          if (this.role === 'ADMIN') {
            if (this.reviewStatus === 'CONTENT_MANAGER_ACCEPTED') {
              this.message =
                ' You have approved the article, it will be sent to the Reviewer for further review.';
            } else {
              this.message =
                'You have approved the article, it will be sent to the Reviewer for further review.';
            }
          } else if (this.role === 'CONTENTMANAGER') {
            this.message =
              'You have approved the article, it will be sent to the Admin for further review.';
          } else {
            this.message =
              'You have approved the article, it will be sent to the Admin for further review.';
          }
          this.articleApproved = true;
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
      const articleId = this.article?.id;
      if (articleId) {
        const baseUrl = endPoints.secureBaseURL;
        const articleUrl = `${baseUrl}/secure/articles/review/${articleId}`;
        const articleData = {
          status: 'REJECTED',
          summary: this.comment,
        };
        const headers = {
          'Content-Type': 'application/json',
        };

        this.http.patch(articleUrl, articleData, { headers }).subscribe(
          (response) => {
            console.log('Article rejection successful:', response);
            if (this.role === 'ADMIN') {
              this.message =
                'You have rejected the article, a notification containing the details of rejection will be sent to the author.';
            } else if (this.role === 'CONTENTMANAGER') {
              this.message =
                'You have rejected the article, it will be sent to the Admin for further review.';
            } else {
              this.message =
                'You have rejected the article, it will be sent to the Admin for further review.';
            }
            this.articleRejected = true;

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
    this.router.navigate(['/authentication/homepage']);
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
        const articleUrl =
          endPoints.baseURL + `/secure/articles/review/${articleId}`;

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
