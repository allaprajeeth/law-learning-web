import { Component, OnInit } from '@angular/core';
import { Article } from '../fetcharticle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

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
  // fileOpened: boolean = false;
  storedFileContent: string | undefined;
  // articleApproved: boolean = false;
  // articleRejected: boolean = false;
  // approvalStatus: string = '';
  // comment: string = '';
  // commentError: boolean = false;
  // articleee: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetcharticle: FetcharticlesService,
    private fileSaverService: FileSaverService,
    private http: HttpClient,
    public dialog: MatDialog,
    private location: Location
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
    this.http.get(`http://192.168.1.42:8080/api/v1/downloadFile?path=${fileUrl}`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.storedFileContent = data;
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          // Uncomment the following lines if you want to trigger a download
          // link.download = 'downloaded-file'; 
          // link.style.display = 'none';
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
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

  goBack() {
    this.location.back();
  }
}


