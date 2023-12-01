import { Component } from '@angular/core';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss'],
})

export class ArticleHistoryComponent {

  publishedArticles = [
    {
      name: 'The Impact of Technology on Patent Law',
      submissionDate: '07-07-2023',
      publishedDate: '10-08-2023',
    },
    {
      name: 'Understanding Intellectual Property Law',
      submissionDate: '15-07-2023',
      publishedDate: '17-08-2023',
    },
    {
      name: 'Challenges in International Human Rights Law',
      submissionDate: '11-09-2023',
      publishedDate: '18-09-2023',
    },
    {
      name: 'Environmental Law and Sustainable Development',
      submissionDate: '20-07-2023',
      publishedDate: '28-09-2023',
    }
  ];

  underReviewArticles = [
    {
      name: 'Law School Applications',
      submissionDate: '14-09-2023',
    },
    {
      name: 'Landmark Cases in Criminal Law',
      submissionDate: '03-07-2023',
    },
    {
      name: 'Privacy Laws in the Digital Age',
      submissionDate: '21-07-2023',
    },
    {
      name: 'The Evolution of Constitutional Law',
      submissionDate: '29-10-2023',
    }
  ];

  commentedArticles = [
    {
      name: 'Immigration Laws and Global Migration Trends',
      submissionDate: '19-10-2023',
    },
    {
      name: 'Comparative Legal Systems around the World',
      submissionDate: '09-08-2023',
    },
    {
      name: 'Legal Ethics in the Legal Profession',
      submissionDate: '26-09-2023',
    },
    {
      name: 'Legal Implications of Artificial Intelligence',
      submissionDate: '27-10-2023',
    }
  ];
}
