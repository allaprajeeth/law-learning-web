import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { endPoints } from 'src/app/common/constants/endpoints';



interface Categories {
  viewValue: string;
}
interface ApiResponse {
  data: {
    content: Course[];
  };
  status: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  title = 'my-first-app';
  // categories: Categories[] = [
  //   { viewValue: 'Beginner' },
  //   { viewValue: 'Intermediate' },
  //   { viewValue: 'Expert' },
  //   { viewValue: 'Student' },
  // ];

  rejectedimages:string[]=[];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];

  //articles
  
  articles: Article[] = [];
  courses!: Course[];
  s3BaseURL: string = endPoints.s3BaseURL; 
  
  j: number = 0; 

  isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(false);
  
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
    // this.loadArticles();
    this.loadCourses();

  }
  loadCourses(): void {
    const number = 0; 
    const size = 20; 
  
    this.courseService.getReviewCourses(number, size)
      .subscribe(
        (response: ApiResponse) => {
          if (response && response.data && response.data.content) {
            this.courses = response.data.content.map(course => ({
              ...course,
            })) as Course[];
            console.log('Courses:', this.courses); 
          } else {
            console.error('Invalid response format:', response);
          }
        },
        (error) => {
          console.error('Error fetching courses:', error);
        }
      );
  }  
  navigateToCourseInfo(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (course) => {
        this.router.navigate(['/authentication/courseinfo', courseId], {
          state: { course: course }
        });
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }
  
  


  onImageError(event: any) {
    event.target.src = 'assets/law.png';
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  constructor(private route: ActivatedRoute, 
    private articleService: ArticleService, 
    private courseService: CourseService,
    private dialog: MatDialog,
    private router: Router) { }

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