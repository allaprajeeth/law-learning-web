import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ArticleService } from '../article.service'; 
import { Article } from '../article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;

  constructor(private route: ActivatedRoute, 
    public articleService: ArticleService, 
    private router: Router,
   ) {}
   ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = +params.get('id')!;
      const fileId = params.get('fileId'); // Add this line

      this.article = this.articleService.getSelectedArticle();
    });
  }
  goBack(): void {
    this.router.navigate(['/authentication/homepage']);
  }

  openFile(fileUrl: string): void {
    window.open(fileUrl,);
  }
}
