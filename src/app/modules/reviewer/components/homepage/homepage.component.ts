import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerService } from '../reviewer.service';
import { Article } from '../reviewer.model';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  approvedArticles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewerService:ReviewerService,
    
    ) { }

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

  navigateToArticleDetail(articleId: number): void {
    // Find the selected article by its id
    const selectedArticle = this.approvedArticles.find(article => article.id === articleId);

    // Log the selected article details to the console
    console.log('Selected Article Details:', selectedArticle);

    // Navigate to the article detail page and pass the article ID
    this.router.navigate(['/reviewer/detail-articles', articleId]);
  }
}





























































// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// interface Categories {
//   viewValue: string;
// }

// @Component({
//   selector: 'app-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.scss']
// })
// export class HomepageComponent implements OnInit{
  
//   title = 'my-first-app';
//   categories: Categories[] = [
//     { viewValue: 'Beginner' },
//     { viewValue: 'Intermediate' },
//     { viewValue: 'Expert' },
//     { viewValue: 'Student' },
//   ];

//   rejectedimages:string[]=[];
//   mycoursesimages: string[] = [];
//   availablecoursesimages: string[] = [];

//   subscribersValues = ["10", "50", "100", "200", "500", "1000"];

//   uploadedCoursesDurations: string[] = [];
//   availableCoursesDurations: string[] = [];

//   //articles
//   filteredArticles: any[] = [];
//   allArticles: any[] = [/* your array of articles */];
  
//   j: number = 0; 

//   isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);
//   reviewheadings: string[] = [
//     'Constitutional Law',
//     'Criminal Law',
//     'Civil Procedure',
//     'Contract Law',
//     'Tort Law',
//     'Property Law',
//     'Administrative Law',
//     'International Law',
//     'Family Law',
//     'Environmental Law',
//     'Intellectual Property Law',
//     'Human Rights Law',
//   ];
//   reviewparagraphs: string[] = [
//     'Government Structure Rules.',
//     'Offenses and Punishments.',
//     'Legal Court Processes.',
//     'Agreement Enforcement Rules.',
//     'Civil Wrong Remedies.',
//     'Ownership Rights Regulation.',
//     'Global Relations Laws.',
//     'Domestic Relationship Regulations.',
//     "Nature Protection Rules.",
//     'Creative Rights Protection.',
//     'Fundamental Freedom Safeguards.',
//     'Business Entity Regulations.',
//   ];

//   reviewAuthors: string[] = [
//     'William Jackson',
//     'Laura Roberts',
//     'Richard Martin',
//     'Lisa Miller',
//   ];

//   reviewText: string[] = [
//     'Expert | Detailed Course', 
//     'Student | Crash Course', 
//     'Beginner | Crash Course', 
//     'Intermediate | Detailed Course',
//   ];
//   reviewedheadings: string[] = [
//     'Constitutional Law',
//     'Criminal Law',
//     'Civil Procedure',
//     'Contract Law',
//     'Tort Law',
//     'Property Law',
//     'Administrative Law',
//     'International Law',
//     'Family Law',
//     'Environmental Law',
//     'Intellectual Property Law',
//     'Human Rights Law',
//   ];

//   reviewedparagraphs: string[] = [
//     'Government Structure Rules.',
//     'Offenses and Punishments.',
//     'Legal Court Processes.',
//     'Agreement Enforcement Rules.',
//     'Civil Wrong Remedies.',
//     'Ownership Rights Regulation.',
//     'Global Relations Laws.',
//     'Domestic Relationship Regulations.',
//     "Nature Protection Rules.",
//     'Creative Rights Protection.',
//     'Fundamental Freedom Safeguards.',
//     'Business Entity Regulations.',
//   ];
//   reviewedAuthors: string[] = [
//     'William Jackson',
//     'Laura Roberts',
//     'Richard Martin',
//     'Lisa Miller',
//   ];

//   reviewedText: string[] = [
//     'Expert | Detailed Course', 
//     'Student | Crash Course', 
//     'Beginner | Crash Course', 
//     'Intermediate | Detailed Course',
//   ];
//   randomMyCourseValues: number[] = [];
//   randomAvailableCourses: number[] = [];
//   randomRejectedValues:number[]=[];
//   availableCousrseSubscribers: string[] = [];
//   myCourseSubscribers: string[] = [];
  
//   ngOnInit(): void {

//     for (let i = 0; i < 2; i++) {
//       const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
//       this.rejectedimages.push(randomImageURL);
//       const randomValue = Math.floor(Math.random() * 100) + 1;
//       this.randomRejectedValues.push(randomValue);
//     }

//     for (let i = 0; i < 4; i++) {
//       const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
//       this.mycoursesimages.push(randomImageURL);
//       const randomValue = Math.floor(Math.random() * 100) + 1;
//       this.randomMyCourseValues.push(randomValue);

//       const minHours = 1.5;
//       const maxHours = 6;
//       const hours = minHours + Math.random() * (maxHours - minHours);     
//       const formattedHours = Math.floor(hours);
//       const minutes = Math.floor((hours % 1) * 60);
//       const formattedMinutes = this.formatWithLeadingZero(minutes);    
//       const duration = `${formattedHours}h ${formattedMinutes}m`;
//       this.uploadedCoursesDurations.push(duration);
//     }

//     for (let j = 0; j < 12; j++) {
//       const randomImageURL = `https://picsum.photos/300/200?random=${j}`;
//       this.availablecoursesimages.push(randomImageURL);
//       const randomValue = Math.floor(Math.random() * 100) + 1;
//       this.randomAvailableCourses.push(randomValue);
//       const randomSubscribersIndex = Math.floor(Math.random() * this.subscribersValues.length);
//       this.availableCousrseSubscribers.push(this.subscribersValues[randomSubscribersIndex]);

//       const minHours = 1.5;
//       const maxHours = 6;
//       const hours = minHours + Math.random() * (maxHours - minHours);     
//       const formattedHours = Math.floor(hours);
//       const minutes = Math.floor((hours % 1) * 60);
//       const formattedMinutes = this.formatWithLeadingZero(minutes);    
//       const duration = `${formattedHours}h ${formattedMinutes}m`;
//       this.availableCoursesDurations.push(duration);
//     }

//      //articles
//      this.allArticles = [
//       { name: 'Intellectual Property Trends', category: 'contentManager' },
//       { name: 'Constitutional Challenges Today', category: 'contentManager' },
//       { name: 'Ethics in Criminal Defense', category: 'reviewer' },
//       { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedArticles'},
//       { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedArticles'},
//       { name: 'Global Human Rights Updates', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf', category: 'uploadedArticles'},
//       { name: 'Ethics in Criminal Defense', category: 'reviewer' },
//       { name: 'Ethics in Criminal Defense', category: 'reviewer' },
//     ];
//   }

//   formatWithLeadingZero(value: number): string {
//     return value < 10 ? `0${value}` : `${value}`;
//   }

//   constructor(private route: ActivatedRoute) { }
// }
