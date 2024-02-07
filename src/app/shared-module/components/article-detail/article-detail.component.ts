import { Component, OnInit } from '@angular/core';
import { Article } from '../fetcharticle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
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
    private fetcharticle: FetcharticlesService,
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

    this.fetcharticle.getArticleDetails(this.articleId!).subscribe(
      (response) => {
        this.articleDetails = response || null;
        console.log('Article Details:', this.articleDetails);

        // if (this.articleDetails?.data.files && this.articleDetails.data.files.length > 0) {
        //   this.fetchFileContent(this.articleDetails.data.files[0]?.url);
        // }
      },
      (error) => {
        console.error('Error fetching article details:', error);
        this.error = 'Failed to fetch article details. Please try again later.';
      }
    ).add(() => {
      this.loading = false;
    });
  }
}
