import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../../../../common/models/article.model';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-articlelist-history',
  templateUrl: './articlelist-history.component.html',
  styleUrls: ['./articlelist-history.component.scss']
})
export class ArticlelistHistoryComponent implements OnInit {
  publishedArticles: Article[] = [];
  articles: Article[] = []; 
  pagination = new Pagination ()

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }
  loadArticles() {
    this.articleService.getArticles(this.pagination).subscribe(
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
  // getStatusStyles(status: string | undefined): any {
  //   switch (status) {
  //     case 'Under Review':
  //       return { color: 'Blue' };
  //     case 'Commented':
  //       return { color: 'red' };
  //     case 'Approved':
  //       return { color: 'green' };
  //     default:
  //       return {};
  //   }
  // }
}
