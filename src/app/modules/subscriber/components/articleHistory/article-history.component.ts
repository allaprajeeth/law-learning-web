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
      submissionDate: this.getRandomDate(),
    },
    {
      name: 'Mastering Legal Research',
      status: 'Pending',
      submissionDate: this.getRandomDate(),
    },
    {
      name: 'Law School Applications',
      status: 'Under Review',
      submissionDate: this.getRandomDate(),
    },
    {
      name: 'Legal Ethics',
      status: 'Rejected',
      submissionDate: this.getRandomDate(),
    },
  ];

  constructor(private router: Router, private articleStatusDataService: ArticleStatusDataService) {}

  private adminNames = ['John Doe', 'Alice Smith', 'Bob Johnson', 'Emily Davis'];
  private contentManagerNames = ['Jane Doe', 'Charlie Brown', 'Eva Martinez', 'Daniel Lee'];
  private reviewerNames = ['David Johnson', 'Sarah Smith', 'Michael Brown', 'Jessica Davis'];

  private getRandomName(names: string[]): string {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  private getRandomDate(): string {
    const currentDate = new Date();
    const pastMonths = Math.floor(Math.random() * 4) + 1;
    const pastDays = Math.floor(Math.random() * 30) + 1;
    currentDate.setMonth(currentDate.getMonth() - pastMonths);
    currentDate.setDate(currentDate.getDate() - pastDays);
    return currentDate.toISOString().slice(0, 10);
  }

  private getRandomApprovedDate(): string {
    let randomApprovedDate: string;
    do {
      const currentDate = new Date();
      const pastDays = Math.floor(Math.random() * 30) + 1; // Random days between 1 and 7
      currentDate.setDate(currentDate.getDate() - pastDays);
      randomApprovedDate = currentDate.toISOString().slice(0, 10);
    } while (randomApprovedDate <= this.getRandomDate()); // Ensure that getRandomApprovedDate is greater than getRandomDate
  
    return randomApprovedDate;
  }

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

  viewMore(article: any): void {
    const additionalData = {
      className: this.getStatusClass(article.status),
      approvedByAdmin: this.getRandomName(this.adminNames),
      approvedByContentManager: this.getRandomName(this.contentManagerNames),
      approvedByReviewer: this.getRandomName(this.reviewerNames),
      approvedDate: this.getRandomApprovedDate(),
    };
  
    // Combine article data and additional data
    const dataToPass = { ...article, ...additionalData };
  
    // Set data in the service
    this.articleStatusDataService.setData(dataToPass);
  
    this.router.navigate(['/articleStatus']);
  }

}
