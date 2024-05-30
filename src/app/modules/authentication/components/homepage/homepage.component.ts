import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../../../../common/models/article.model';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { Pagination } from 'src/app/common/models/pagination.model';

interface ApiResponse {
  data: {
    content: Course[];
    totalElements:number
  };
  status: number;
}

@Pipe({
  name: 'truncateWords',
})
export class TruncateWordsPipe implements PipeTransform {
  transform(
    value: string,
    limit: number = 3,
    completeWords: boolean = false,
    ellipsis: string = '...'
  ): string {
    if (!value) return '';
    let words = value.split(' ');
    if (words.length <= limit) return value;
    if (completeWords) {
      limit = words.slice(0, limit).join(' ').length;
    }
    return words.slice(0, limit).join(' ') + ellipsis;
  }
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  title = 'my-first-app';
  rejectedimages: string[] = [];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];
  subscribersValues = ['10', '50', '100', '200', '500', '1000'];
  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];
  articles: Article[] = [];
  courses!: Course[];
  s3BaseURL: string = endPoints.s3BaseURL;
  pagination1: Pagination = new Pagination();
  pagination2: Pagination = new Pagination();

  j: number = 0;

  isHovered: boolean[] = new Array(this.availablecoursesimages.length).fill(
    false
  );

  randomMyCourseValues: number[] = [];
  randomRejectedValues: number[] = [];
  myCourseSubscribers: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private courseService: CourseService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles(this.pagination2).subscribe(
      (response) => {
        this.articles = response.data.content;
        this.pagination2.totalElements = response.data.totalElements;
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

    this.courseService.getReviewCourses(this.pagination1).subscribe(
      (response: ApiResponse) => {
        if (response && response.data && response.data.content) {
          this.pagination1.totalElements=response.data.totalElements
          this.courses = response.data.content.map((course) => ({
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
          state: { course: course },
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

  loadArticles() {
    this.articleService.getArticles(this.pagination2).subscribe(
      (response: any) => {
        this.articles = response.data.content;
        
        this.pagination2.totalElements = response.data.totalElements;
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
  truncateTitle(title: string, limit: number): string {
    const words = title.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'; // Add '...' after the truncated words
    } else {
      return title;
    }
  }
  onPageChange1(pagination: Pagination) {
    this.pagination1.page = pagination.page;
    this.pagination1.size = pagination.size;
    this.loadCourses();
  }
  onPageChange2(pagination: Pagination) {
    this.pagination2.page = pagination.page;
    this.pagination2.size = pagination.size;
    this.loadArticles();
  }
}
