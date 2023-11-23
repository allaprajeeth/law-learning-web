import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleStatusDataService } from '../article-status-data.service';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss'],
})

export class ArticleHistoryComponent {
  articles = [
    {
      name: 'What is Criminal Law',
      status: 'Approved',
      submissionDate: '07-07-2023',
    },
    {
      name: 'Mastering Legal Research',
      status: 'Pending',
      submissionDate: '10-08-2023',
    },
    {
      name: 'Law School Applications',
      status: 'Under Review',
      submissionDate: '14-09-2023',
    },
    {
      name: 'Legal Ethics',
      status: 'Rejected',
      submissionDate: '19-10-2023',
    },
  ];

  constructor(private router: Router, private articleStatusDataService: ArticleStatusDataService) {}

  private adminNames = ['John Doe', 'Alice Smith', 'Bob Johnson', 'Emily Davis'];
  private contentManagerNames = ['Jane Doe', 'Charlie Brown', 'Eva Martinez', 'Daniel Lee'];
  private reviewerNames = ['David Johnson', 'Sarah Smith', 'Michael Brown', 'Jessica Davis'];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'Approved';
      case 'Under Review':
        return 'UnderReview';
      case 'Rejected':
        return 'Rejected';
      case 'Pending':
        return 'Pending';
      default:
        return '';
    }
  }
 
  private adminIndex = 0;
  private contentManagerIndex = 1;
  private reviewerIndex = 2;

  viewMore(article: any): void {
    const approvedByAdmin = this.adminNames[this.adminIndex];
    const approvedByContentManager = this.contentManagerNames[this.contentManagerIndex];
    const approvedByReviewer = this.reviewerNames[this.reviewerIndex];

    this.adminIndex = (this.adminIndex + 1) % this.adminNames.length;
    this.contentManagerIndex = (this.contentManagerIndex + 1) % this.contentManagerNames.length;
    this.reviewerIndex = (this.reviewerIndex + 1) % this.reviewerNames.length;

    const additionalData = {
      className: this.getStatusClass(article.status),
      approvedByAdmin: approvedByAdmin,
      approvedByContentManager: approvedByContentManager,
      approvedByReviewer: approvedByReviewer,
      approvedDate: '21-11-2023',
    };
  
    const dataToPass = { ...article, ...additionalData };
    this.articleStatusDataService.setData(dataToPass);
    this.router.navigate(['/articleStatus']);
  }
}

