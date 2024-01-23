// articlelist-history.component.ts

import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-articlelist-history',
  templateUrl: './articlelist-history.component.html',
  styleUrls: ['./articlelist-history.component.scss']
})
export class ArticlelistHistoryComponent implements OnInit {
  publishedArticles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe(
      (response: any)  => {
        // Use type assertion to tell TypeScript that you know the structure
        this.publishedArticles = response.content;
      },
      error => console.error('Error fetching articles:', error)
    );
  }
  

  // deleteArticle(articleId: number) {
  //   this.articleService.deleteArticle(articleId).subscribe(
  //     response => {
  //       console.log('Article deleted successfully:', response);
  //       // Reload the articles after deletion
  //       this.loadArticles();
  //     },
  //     error => console.error('Error deleting article:', error)
  //   );
  // }

  getStatusStyles(status: string | undefined): any {
    switch (status) {
      case 'Under Review':
        return { color: 'Blue' };
      case 'Commented':
        return { color: 'red' };
      case 'Approved':
        return { color: 'green' };
      default:
        return {};
    }
  }
}