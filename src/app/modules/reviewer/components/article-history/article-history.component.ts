import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service';
import { Article } from '../reviewer.model';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss']
})

export class ArticleHistoryComponent implements OnInit{
  approvedArticles: Article[] = [];
  pagination: Pagination = new Pagination();

  constructor(private reviewerService: ReviewerService) { }

  ngOnInit(): void {
    this.getApprovedArticles();
  }
  getApprovedArticles(): void {
    this.reviewerService.getApprovedArticles(this.pagination).subscribe(
      (response) => {
        this.approvedArticles = response.data.content || [];
        this.pagination.totalElements=response.data.totalElements
      },
      (error) => {
        console.error('Error fetching approved articles:', error);
      }
    );
  }
  onPageChange(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.getApprovedArticles()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStatusStyles(status: string): any {
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
