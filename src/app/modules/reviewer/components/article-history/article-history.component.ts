import { Component } from '@angular/core';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss']
})

export class ArticleHistoryComponent {
  publishedArticles = [
    {
      id: 1,
      title: 'What Is Criminal Law',
      submissionDate: '07-07-2023',
      status: 'Approved',
    },
    {
      id: 2,
      title: 'Mastering Legal Research',
      submissionDate: '15-07-2023',
      status: 'Under Review',
    },
    {
      title: 'Challenges in International Human Rights Law',
      submissionDate: '11-09-2023',
      status: 'Commented',
    },
    {
  
      title: 'Environmental Law and Sustainable Development',
      submissionDate: '20-07-2023',
      status: 'Under Review',
    }
  ];

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
