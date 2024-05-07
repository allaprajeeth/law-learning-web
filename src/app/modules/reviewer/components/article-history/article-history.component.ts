import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service';
import { Article } from '../reviewer.model';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss']
})

export class ArticleHistoryComponent implements OnInit{
  approvedArticles: Article[] = [];
  constructor(private reviewerService: ReviewerService) { }

  ngOnInit(): void {
    this.getApprovedArticles();
  }
  getApprovedArticles(): void {
    this.reviewerService.getApprovedArticles().subscribe(
      (response) => {
        this.approvedArticles = response.data.content || [];
      },
      (error) => {
        console.error('Error fetching approved articles:', error);
      }
    );
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
