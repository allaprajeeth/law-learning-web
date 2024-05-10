import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Article } from '../admin.model';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss'],
})
export class ArticleHistoryComponent implements OnInit {
  approvedArticles: Article[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getApprovedArticles();
  }

  getApprovedArticles(): void {
    this.adminService.getApprovedArticles().subscribe(
      (response) => {
        this.approvedArticles = response.data.content || [];
        this.approvedArticles.forEach((article) => {
          if (article.reviewStatus === 'SUBMITTED') {
            article.reviewStatus = 'Under Review'; 
          }
        });
      },
      (error) => {
        console.error('Error fetching approved articles:', error);
      }
    );
  }
}
