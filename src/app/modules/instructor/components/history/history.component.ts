import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleHistoryDataService } from '../article-history-data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  ngOnInit() {
    console.log('HistoryComponent - ngOnInit');
    this.categorizeArticles();
  }
  
  articles = [
    {
      name: 'The Impact of Technology on Patent Law',
      status: 'Approved',
      submissionDate: '07-07-2023',
      publishedDate: '10-08-2023',
    },
    {
      name: 'Law School Applications',
      status: 'Under Review',
      submissionDate: '14-09-2023',
    },
    {
      name: 'Immigration Laws and Global Migration Trends',
      status: 'Commented',
      submissionDate: '19-10-2023',
    },
    {
      name: 'Legal Ethics in the Legal Profession',
      status: 'Under Review',
      submissionDate: '26-09-2023',
    },
    {
      name: 'Understanding Intellectual Property Law',
      status: 'Approved',
      submissionDate: '15-07-2023',
      publishedDate: '17-08-2023',
    },
    {
      name: 'Landmark Cases in Criminal Law',
      status: 'Under Review',
      submissionDate: '03-07-2023',
    },
    {
      name: 'Privacy Laws in the Digital Age',
      status: 'Commented',
      submissionDate: '21-07-2023',
    },
    {
      name: 'The Evolution of Constitutional Law',
      status: 'Under Review',
      submissionDate: '29-10-2023',
    },
    {
      name: 'Challenges in International Human Rights Law',
      status: 'Approved',
      submissionDate: '11-09-2023',
      publishedDate: '18-09-2023',
    },
    {
      name: 'Comparative Legal Systems around the World',
      status: 'Commented',
      submissionDate: '09-08-2023',
    },
    {
      name: 'Environmental Law and Sustainable Development',
      status: 'Approved',
      submissionDate: '20-07-2023',
      publishedDate: '28-09-2023',
    },
    {
      name: 'Legal Implications of Artificial Intelligence',
      status: 'Commented',
      submissionDate: '27-10-2023',
    },
  ];

  approvedArticles: any[] = [];
  underReviewArticles: any[] = [];
  commentedArticles: any[] = [];

  constructor(
    private router: Router,
    private articleHistoryDataService: ArticleHistoryDataService
  ) {}
  
  // private adminNames = [
  //   'John Doe',
  //   'Alice Smith',
  //   'Bob Johnson',
  //   'Emily Davis',
  // ];
  // private contentManagerNames = [
  //   'Jane Doe',
  //   'Charlie Brown',
  //   'Eva Martinez',
  //   'Daniel Lee',
  // ];
  // private reviewerNames = [
  //   'David Johnson',
  //   'Sarah Smith',
  //   'Michael Brown',
  //   'Jessica Davis',
  // ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'Approved';
      case 'Under Review':
        return 'UnderReview';
      case 'Commented':
        return 'Commented';
      default:
        return '';
    }
  }

  // private adminIndex = 0;
  // private contentManagerIndex = 1;
  // private reviewerIndex = 2;

  viewMore(article: any): void {
    const additionalData = {
      className: this.getStatusClass(article.status),
      // approvedByAdmin: this.adminNames[this.adminIndex],
      // approvedByContentManager:
      //   this.contentManagerNames[this.contentManagerIndex],
      // approvedByReviewer: this.reviewerNames[this.reviewerIndex],
      approvedDate: '21-11-2023',
    };

    // this.adminIndex = (this.adminIndex + 1) % this.adminNames.length;
    // this.contentManagerIndex =
    //   (this.contentManagerIndex + 1) % this.contentManagerNames.length;
    // this.reviewerIndex = (this.reviewerIndex + 1) % this.reviewerNames.length;

    const dataToPass = { ...article, ...additionalData };
    this.articleHistoryDataService.setData(dataToPass);

    console.log('Data to pass:', dataToPass);

    this.router.navigate(['/status']);
  }

  // Function to categorize articles based on status
  categorizeArticles(): void {
    this.articles.forEach((article) => {
      switch (article.status) {
        case 'Approved':
          this.approvedArticles.push(article);
          break;
        case 'Under Review':
          this.underReviewArticles.push(article);
          break;
        case 'Commented':
          this.commentedArticles.push(article);
          break;
      }
    });
  }
}
