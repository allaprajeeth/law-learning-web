import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-history',
  templateUrl: './article-history.component.html',
  styleUrls: ['./article-history.component.scss'],
})

export class ArticleHistoryComponent {

  constructor(private router: Router) {}

  publishedArticles = [
    {
      id: 1,
      title: 'What Is Criminal Law?',
      submissionDate: '07-07-2023',
      publishedDate: '10-08-2023',
    },
    {
      id: 2,
      title: 'Mastering Legal Research',
      submissionDate: '15-07-2023',
      publishedDate: '17-08-2023',
    },
    {
      id: 3,
      title: 'Challenges in International Human Rights Law',
      submissionDate: '11-09-2023',
      publishedDate: '18-09-2023',
    },
    {
      id: 4,
      title: 'Environmental Law and Sustainable Development',
      submissionDate: '20-07-2023',
      publishedDate: '28-09-2023',
    }
  ];

  underReviewArticles = [
    {
      id: 5,
      name: 'Pragmatic Family Law',
      submissionDate: '14-09-2023',
    },
    {
      id: 6,
      name: 'Landmark Cases in Criminal Law',
      submissionDate: '03-07-2023',
    },
    {
      id: 7,
      name: 'Privacy Laws in the Digital Age',
      submissionDate: '21-07-2023',
    },
    {
      id: 8,
      name: 'The Evolution of Constitutional Law',
      submissionDate: '29-10-2023',
    }
  ];

  commentedArticles = [
    {
      id: 9,
      name: 'The Common Law ',
      submissionDate: '19-10-2023',
    },
    {
      id: 10,
      name: 'Comparative Legal Systems around the World',
      submissionDate: '09-08-2023',
    },
    {
      id: 11,
      name: 'Legal Ethics in the Legal Profession',
      submissionDate: '26-09-2023',
    },
    {
      id: 12,
      name: 'Legal Implications of Artificial Intelligence',
      submissionDate: '27-10-2023',
    }
  ];

  openArticleDetails(articleId: number | undefined) {
    // if (articleId !== undefined) {
    //   this.router.navigate(['/subscriber/article-details', articleId]);
    // }
  }
}
