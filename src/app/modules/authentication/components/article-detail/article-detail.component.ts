// article-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  fileOpened: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public articleService: ArticleService,
    private router: Router,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = +params.get('id')!;
      const fileId = params.get('fileId');
      this.article = this.articleService.getSelectedArticle();
      console.log('Articles in article-detail:', this.article);
    });
  }

  openFile(fileUrl?: string, fileName?: string): void {
    if (fileUrl) {
      // Open the file directly
      this.fileOpened = true;

      console.log('File URL:', fileUrl);
      console.log('Opening file:', fileName);
      window.open(fileUrl, '_blank');
      // realines
    } else {
      console.error('File URL is undefined.');
    }

   
  }


 



  goBack(): void {
    this.router.navigate(['/authentication/homepage']);
  }
}