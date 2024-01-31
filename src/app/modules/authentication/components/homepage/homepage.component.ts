import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
interface Categories {
  viewValue: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

  rejectedimages:string[]=[];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];

  //articles
  
  articles: Article[] = []; 
  
  j: number = 0; 

  isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);
  reviewheadings: string[] = [
    'Constitutional Law',
    'Criminal Law',
    'Civil Procedure',
    'Contract Law',
    'Tort Law',
    'Property Law',
    'Administrative Law',
    'International Law',
    'Family Law',
    'Environmental Law',
    'Intellectual Property Law',
    'Human Rights Law',
  ];
  reviewparagraphs: string[] = [
    'Government Structure Rules.',
    'Offenses and Punishments.',
    'Legal Court Processes.',
    'Agreement Enforcement Rules.',
    'Civil Wrong Remedies.',
    'Ownership Rights Regulation.',
    'Global Relations Laws.',
    'Domestic Relationship Regulations.',
    "Nature Protection Rules.",
    'Creative Rights Protection.',
    'Fundamental Freedom Safeguards.',
    'Business Entity Regulations.',
  ];

  reviewAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
  ];

  reviewText: string[] = [
    'Expert | Detailed Course', 
    'Student | Crash Course', 
    'Beginner | Crash Course', 
    'Intermediate | Detailed Course',
  ];
  reviewedheadings: string[] = [
    'Constitutional Law',
    'Criminal Law',
    'Civil Procedure',
    'Contract Law',
    'Tort Law',
    'Property Law',
    'Administrative Law',
    'International Law',
    'Family Law',
    'Environmental Law',
    'Intellectual Property Law',
    'Human Rights Law',
  ];

  reviewedparagraphs: string[] = [
    'Government Structure Rules.',
    'Offenses and Punishments.',
    'Legal Court Processes.',
    'Agreement Enforcement Rules.',
    'Civil Wrong Remedies.',
    'Ownership Rights Regulation.',
    'Global Relations Laws.',
    'Domestic Relationship Regulations.',
    "Nature Protection Rules.",
    'Creative Rights Protection.',
    'Fundamental Freedom Safeguards.',
    'Business Entity Regulations.',
  ];
  reviewedAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
  ];

  reviewedText: string[] = [
    'Expert | Detailed Course', 
    'Student | Crash Course', 
    'Beginner | Crash Course', 
    'Intermediate | Detailed Course',
  ];
  randomMyCourseValues: number[] = [];
  randomRejectedValues:number[]=[];
  myCourseSubscribers: string[] = [];
  
  ngOnInit(): void {

    this.articleService.getArticles().subscribe(
      (articles) => {
        this.articles = articles;
        console.log('Number of articles:', this.articles.length);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
    
   
    for (let i = 0; i < 2; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.rejectedimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomRejectedValues.push(randomValue);
    }

    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.mycoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomMyCourseValues.push(randomValue);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.uploadedCoursesDurations.push(duration);
    }

    // this.loadArticles();

  }
  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) { }

  loadArticles() {
    this.articleService.getArticles().subscribe(
      (response: any) => {
        this.articles = response.data.content;
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
  navigateToArticleDetail(articleId: number): void {
    this.articleService.setSelectedArticle(articleId);
    this.router.navigate(['/authentication/detail-articles', articleId]);
  } 
}