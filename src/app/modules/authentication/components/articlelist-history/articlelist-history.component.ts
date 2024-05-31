import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../../../../common/models/article.model';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-articlelist-history',
  templateUrl: './articlelist-history.component.html',
  styleUrls: ['./articlelist-history.component.scss'],
})
export class ArticlelistHistoryComponent implements OnInit {
  publishedArticles: Article[] = [];
  articles: Article[] = [];
  pagination = new Pagination();

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }
  loadArticles() {
    this.articleService.getArticles(this.pagination).subscribe(
      (response: any) => {
        this.publishedArticles = response.data.content;
        this.pagination.totalElements = response.data.totalElements;
        console.log('publishedArticles', this.publishedArticles);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
  onPageChange(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.loadArticles()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
