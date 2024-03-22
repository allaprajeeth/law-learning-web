import { Component, OnInit } from '@angular/core';
import { Article } from '../fetcharticle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { endPoints } from 'src/app/common/constants/endpoints';

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
}


