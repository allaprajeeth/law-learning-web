import { Component } from '@angular/core';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss'],
})

export class ArticleHistoryComponent {
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

  publishedArticles: any[] = [];
  underReviewArticles: any[] = [];
  commentedArticles: any[] = [];
}
