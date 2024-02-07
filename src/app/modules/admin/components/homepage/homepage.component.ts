// homepage.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ArticleApiResponse, Article } from '../admin.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  approvedArticles: Article[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getApprovedArticles();
  }

  getApprovedArticles(): void {
    this.adminService.getApprovedArticles().subscribe(
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
    this.router.navigate(['/admin/detail-articles', articleId]);
  }
}








































// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { FilterByCategoryService } from '../filter-by-category.service';
// import { AdminService } from '../admin.service';
// import { ApiResponse } from '../admin.model';
// import { Observable } from 'rxjs';



// interface Categories {
//   viewValue: string;
// }
// interface PdfFile {
//   name: string;
//   url: string;
// }

// interface articleFile {
//   name: string;
//   url: string;
// }
// @Component({
//   selector: 'app-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.scss'],

// })
// export class HomepageComponent implements OnInit {

//   approvedArticles: any[] = [];

  // selectedFilter: string = 'all';
  // filteredArticles: any[] = [];

  // approvedArticles: any[] = [];

  // coursesFilter: string = '';
  // libraryFilter: string = '';
  // publishingCornerFilter: string = '';


  // categories: Categories[] = [
  //   { viewValue: 'Beginner' },
  //   { viewValue: 'Intermediate' },
  //   { viewValue: 'Expert' },
  //   { viewValue: 'Student' },
  // ];


  // rejectedimages: string[] = [];
  // mycoursesimages: string[] = [];
  // availablecoursesimages: string[] = [];
  // uploadedimages: string[] = [];

  // subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  // uploadedCoursesDurations: string[] = [];
  // availableCoursesDurations: string[] = [];
  // rejectedCoursesDurations: string[] = [];
  // myCoursesDurations: string[] = [];

  // availableCourseSubscribers: string[] = [];

  // j: number = 0;

  // isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);



  // headings: string[] = [
  //   'Constitutional Law',
  //   'Criminal Law',
  //   'Civil Procedure',
  //   'Contract Law',
  //   'Tort Law',
  //   'Property Law',
  //   'Administrative Law',
  //   'International Law',
  //   'Family Law',
  //   'Environmental Law',
  //   'Intellectual Property Law',
  //   'Human Rights Law',
  // ];
  // uploadedheadings: string[] = [
  //   'Constitutional Law',
  //   'Criminal Law',
  //   'Civil Procedure',
  //   'Contract Law',
  //   'Tort Law',
  //   'Property Law',
  //   'Administrative Law',
  //   'International Law',
  //   'Family Law',
  //   'Environmental Law',
  //   'Intellectual Property Law',
  //   'Human Rights Law',
  // ];

  // reviewCoursesAuthors: string[] = [
  //   'John Smith',
  //   'Mary Johnson',
  //   'David Wilson',
  //   'Sarah Davis',
  //   'Michael Brown',
  //   'Jennifer White',
  //   'Robert Lee',
  //   'Susan Anderson',
  //   'Charles Harris',
  //   'Amanda Lewis',
  //   'Laura Roberts',
  //   'Robert Lee',
  // ];
  // uploadedCoursesAuthors: string[] = [
  //   'William Jackson',
  //   'Laura Roberts',
  //   'Richard Martin',
  //   'Lisa Miller',
  // ];

  // reviewCoursesText: string[] = [
  //   'Student | Crash Course',
  //   'Beginner | Detailed Course',
  //   'Intermediate | Crash Course',
  //   'Student | Detailed Course',
  //   'Expert | Crash Course',
  //   'Student | Crash Course',
  //   'Beginner | Crash Course',
  //   'Intermediate | Detailed Course',
  //   'Expert | Detailed Course',
  // ];

  // uploadedCoursesText: string[] = [
  //   'Expert | Detailed Course',
  //   'Beginner | Crash Course',
  //   'Intermediate | Detailed Course',
  //   'Student | Crash Course',
  //   'Beginner | Detailed Course',
  //   'Intermediate | Crash Course',
  //   'Student | Detailed Course',
  //   'Expert | Crash Course',
  //   'Student | Crash Course',
  //   'Beginner | Crash Course',
  //   'Intermediate | Detailed Course',
  //   'Expert | Detailed Course',
  // ];
  // paragraphs: string[] = [
  //   'Government Structure Rules.',
  //   'Offenses and Punishments.',
  //   'Legal Court Processes.',
  //   'Agreement Enforcement Rules.',
  //   'Civil Wrong Remedies.',
  //   'Ownership Rights Regulation.',
  //   'Global Relations Laws.',
  //   'Domestic Relationship Regulations.',
  //   "Nature Protection Rules.",
  //   'Creative Rights Protection.',
  //   'Fundamental Freedom Safeguards.',
  //   'Business Entity Regulations.',
  // ];

  // uploadedparagraphs: string[] = [
  //   'Government Structure Rules.',
  //   'Offenses and Punishments.',
  //   'Legal Court Processes.',
  //   'Agreement Enforcement Rules.',
  //   'Civil Wrong Remedies.',
  //   'Ownership Rights Regulation.',
  //   'Global Relations Laws.',
  //   'Domestic Relationship Regulations.',
  //   "Nature Protection Rules.",
  //   'Creative Rights Protection.',
  //   'Fundamental Freedom Safeguards.',
  //   'Business Entity Regulations.',
  // ];

  // coursePrice = [
  //   3199, 3029, 3229, 3009, 3599, 3055, 3199, 3327, 3087, 3299, 3172, 3449,
  // ];

  // randomMyCourseValues: number[] = [];
  // randomAvailableCourses: number[] = [];
  // randomRejectedValues: number[] = [];
  // randomuploadedValues: number[] = [];

  // availableCousrseSubscribers: string[] = [];
  // myCourseSubscribers: string[] = [];

  // allArticles: any[] = [/* your array of articles */];
  // contentManagerArticles: any[] = [];
  // reviewerArticles: any[] = [];
  // uploadedArticles: any[] = [];


  // ngOnInit(): void {


  //   this.getApprovedArticles().subscribe(
  //     (response: ApiResponse) => {
  //       // Assuming your API response has a property like 'content'
  //       this.approvedArticles = response.data.content || [];
  //       console.log('API Response:', response);
  //     },
  //     (error) => {
  //       console.error('Error fetching approved articles:', error);
  //     }
  //   );





    // this.filteredArticles = [...this.allArticles];

    // for (let i = 0; i < 2; i++) {
    //   const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
    //   this.rejectedimages.push(randomImageURL);
    //   const randomValue = Math.floor(Math.random() * 100) + 1;
    //   this.randomRejectedValues.push(randomValue);
    // }

    // for (let i = 0; i < 4; i++) {
    //   const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
    //   this.mycoursesimages.push(randomImageURL);
    //   const randomValue = Math.floor(Math.random() * 100) + 1;
    //   this.randomMyCourseValues.push(randomValue);

    //   const minHours = 1.5;
    //   const maxHours = 6;
    //   const hours = minHours + Math.random() * (maxHours - minHours);
    //   const formattedHours = Math.floor(hours);
    //   const minutes = Math.floor((hours % 1) * 60);
    //   const formattedMinutes = this.formatWithLeadingZero(minutes);
    //   const duration = `${formattedHours}h ${formattedMinutes}m`;
    //   this.uploadedCoursesDurations.push(duration);
    // }

    // for (let i = 0; i < 4; i++) {
    //   const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
    //   this.uploadedimages.push(randomImageURL);
    //   const randomValue = Math.floor(Math.random() * 100) + 1;
    //   this.randomuploadedValues.push(randomValue);

    //   const minHours = 1.5;
    //   const maxHours = 6;
    //   const hours = minHours + Math.random() * (maxHours - minHours);
    //   const formattedHours = Math.floor(hours);
    //   const minutes = Math.floor((hours % 1) * 60);
    //   const formattedMinutes = this.formatWithLeadingZero(minutes);
    //   const duration = `${formattedHours}h ${formattedMinutes}m`;
    //   this.uploadedCoursesDurations.push(duration);
    // }


  // }

  // formatWithLeadingZero(value: number): string {
  //   return value < 10 ? `0${value}` : `${value}`;
  // }

  // getApprovedArticles(): Observable<ApiResponse> {
  //   return this.adminService.getApprovedArticles();
  // }
  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private filterService: FilterByCategoryService,
  //   // private articleService: ArticleService,
  //   private adminService: AdminService
  // ) {


  //   {
      // Filter articles based on categories
      // this.contentManagerArticles = this.allArticles.filter(
      //   (article) => article.category === 'contentManager'
      // );
      // this.reviewerArticles = this.allArticles.filter(
      //   (article) => article.category === 'reviewer'
      // );
      // this.uploadedArticles = this.allArticles.filter(
      //   (article) => article.category === 'uploadedCourses'
      // );
    // }
  // }



  // reviewpdfs = [
  //   { name: 'Human Rights Law and Theory', icon: 'path/to/icon1.png', url: 'path/to/document1.pdf' },
  //   { name: 'Intellectual Property Rights', icon: 'path/to/icon2.png', url: 'path/to/document2.pdf' },
  //   { name: 'Banking and Insurance Law', icon: 'path/to/icon3.png', url: 'path/to/document3.pdf' },
  //   { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
  //   { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
  //   { name: 'Constitutional Law I', icon: 'path/to/icon4.png', url: 'path/to/document4.pdf' },
  // ];

  // filterArticles(): void {
  //   if (this.selectedFilter === 'all') {
  //     this.filteredArticles = [...this.allArticles];
  //   } else {
  //     this.filteredArticles = this.filterService.filterByCategory(this.allArticles, this.selectedFilter);
  //   }
  // }
  // filteredImages() {
  //   switch (this.coursesFilter) {
  //     case 'All':
  //       return this.mycoursesimages;
  //     case 'contentManager':
  //       return this.mycoursesimages.slice(0, 3);
  //     case 'reviewer':
  //       return this.mycoursesimages.slice(0, 2);
  //     case 'uploadedCourses':
  //       return this.mycoursesimages.slice(0, 1); // Keep all images for 'uploadedCourses'
  //     default:
  //       return this.mycoursesimages;
  //   }
  // }
  // Assuming you have an array of PDFs, e.g., reviewpdfs
  // filteredPDFs() {
  //   switch (this.libraryFilter) {
  //     case 'All':
  //       return this.reviewpdfs; // Display all PDFs if no filter is selected
  //     case 'contentManager':
  //       return this.reviewpdfs.slice(0, 3); // Display the first 3 PDFs for 'contentManager'
  //     case 'reviewer':
  //       return this.reviewpdfs.slice(0, 4); // Display the first 2 PDFs for 'reviewer'
  //     case 'uploadedCourses':
  //       return this.reviewpdfs.slice(0, 5); // Display all PDFs for 'uploadedCourses'
  //     default:
  //       return this.reviewpdfs; // Display all PDFs if no filter is selected
  //   }
  // }

  // Assume this.articles contains the list of articles in your component

  // navigateToArticleDetail(articleId: number): void {
  //   // Find the selected article by its id
  //   const selectedArticle = this.approvedArticles.find(article => article.id === articleId);

  //   // Log the selected article to the console
  //   console.log('Selected Article:', selectedArticle);

  //   // Now, you can perform any other actions or navigation logic
  //   this.router.navigate(['/admin/detail-articles', articleId]);
  // }

// }



