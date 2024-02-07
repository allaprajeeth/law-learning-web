// article-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Article } from '../admin.model';
import { FileSaverService } from 'ngx-filesaver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: number | null = null;
  articleDetails: Article | null = null;
  loading = false;
  error: string | null = null;
  fileId: any;
  fileOpened: boolean = false;
  storedFileContent: string | undefined;
  articleApproved: boolean = false;
  articleRejected: boolean = false;
  approvalStatus: string = '';
  comment: string = '';
  commentError: boolean = false;
  articleee: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private fileSaverService: FileSaverService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleId = +params['id'] || null;
      this.fileId = params['fileId'];

      if (this.articleId !== null) {
        this.loadArticleDetails();
      } else {
        console.error('Article ID is null or undefined');
      }
    });
  }

  loadArticleDetails(): void {
    this.loading = true;
    this.error = null;

    this.adminService.getArticleDetails(this.articleId!).subscribe(
      (response) => {
        this.articleDetails = response || null;
        console.log('Article Details:', this.articleDetails);

        if (this.articleDetails?.data.files && this.articleDetails.data.files.length > 0) {
          this.fetchFileContent(this.articleDetails.data.files[0]?.url);
        }
      },
      (error) => {
        console.error('Error fetching article details:', error);
        this.error = 'Failed to fetch article details. Please try again later.';
      }
    ).add(() => {
      this.loading = false;
    });
  }

  downloadFile(fileUrl?: string, fileName?: string): void {
    this.http.get(`http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.storedFileContent = data;
          this.fileOpened = true; 
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'downloaded-file'; // Specify the file name
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

  approveArticle(): void {
    this.approvalStatus = 'approved';
    this.articleApproved = true;
    this.articleee = false;

    const articleId = this.articleId;

    if (articleId) {
      const articleUrl = `http://192.168.1.42:8080/api/v1/secure/articles/review/${articleId}`;

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
          this.adminService.setApprovalResponse(response);
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
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/homepage']);
  }
}






















































// // article-detail.component.ts

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AdminService } from '../admin.service';
// import { Article } from '../admin.model';
// import { FileSaverService } from 'ngx-filesaver';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-article-detail',
//   templateUrl: './article-detail.component.html',
//   styleUrls: ['./article-detail.component.scss'],
// })
// export class ArticleDetailComponent implements OnInit {
//   articleId: number | null = null;
//   articleDetails: Article | null = null;
//   loading = false;
//   error: string | null = null;
//   fileId: any;
//   fileOpened: boolean = false;
//   storedFileContent: string | undefined;
  

//   constructor(
//      private route: ActivatedRoute,
//      private adminService: AdminService,
//      private fileSaverService: FileSaverService,
//     private http: HttpClient 
//      ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.articleId = +params['id'] || null;

//       // const articleId = +params.get('id')!;
//       this.fileId = params['fileId'];
 
//       if (this.articleId !== null) {
//         this.loadArticleDetails();
//       } else {
//         console.error('Article ID is null or undefined');
//       }
//     });
//   }

//   loadArticleDetails(): void {
//     this.loading = true;
//     this.error = null;

//     this.adminService.getArticleDetails(this.articleId!).subscribe(
//       (response) => {
//         this.articleDetails = response || null;
//         console.log('Article Details:', this.articleDetails); // Add this line
//       },
//       (error) => {
//         console.error('Error fetching article details:', error);
//         this.error = 'Failed to fetch article details. Please try again later.';
//       }
//     ).add(() => {
//       this.loading = false;
//     });
//   }


// //   openFile(fileUrl?: string, fileName?: string): void {
// //     if (fileUrl) {
// //         // Construct the download URL with the fileUrl
// //         const downloadUrl = `http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`;
// //         console.log("downloaded url ",downloadUrl);
// //         // Fetch the file content
// //         this.adminService.getFileContent(downloadUrl).subscribe(
// //             (fileContent: string) => {
// //                 // Set the fileOpened flag to true
// //                 this.fileOpened = true;

// //                 // Do something with the file content (e.g., store it in a variable)
// //                 // For demonstration purposes, let's assume there's a property called 'storedFileContent'
// //                 this.storedFileContent = fileContent;
               

// //                 // Alternatively, you can display the content directly in the component's template
// //                 // by binding it to an HTML element (e.g., <p>{{ storedFileContent }}</p>)
// //             },
// //             (error) => {
// //                 console.error('Error fetching file content:', error);
// //             }
            
// //         );
// //         window.open(downloadUrl, '_blank');
// //     } else {
// //         console.error('File URL is undefined.');
// //     }
// // }
// downloadFile(fileUrl?: string, fileName?: string): void {
//   // Replace with the actual file path
  
//   this.http.get(`http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`, { responseType: 'blob' })
//     .subscribe(
//       (data: Blob) => {
//         // this.storedFileContent = data;
//         const blob = new Blob([data], { type: 'application/octet-stream' });
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = 'downloaded-file'; // Specify the file name
//         link.style.display = 'none';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       },
//       error => {
//         console.error('Error downloading file:', error);
//       }
//     );
// }

  
// }
