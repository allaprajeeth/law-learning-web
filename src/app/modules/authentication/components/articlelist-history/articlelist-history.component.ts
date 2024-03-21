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
  articles: Article[] = []; 

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }
  loadArticles() {
    this.articleService.getArticles().subscribe(
      (response: any) => {
        console.log('Response:', response);
        // Assign the array of articles directly to publishedArticles
        this.publishedArticles = response;
        console.log('publishedArticles', this.publishedArticles);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
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
