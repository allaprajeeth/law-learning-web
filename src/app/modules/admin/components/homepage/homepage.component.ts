import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import {  Article } from '../admin.model';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Pagination } from 'src/app/common/models/pagination.model';
interface ApiResponse {
  data: {
    content: Course[];
    totalElements:number
  };
  status: number;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  approvedArticles: Article[] = [];
  allArticles:  Article[] = [];
  courses!: Course[];
  s3BaseURL: string = endPoints.s3BaseURL; 
  pagination1: Pagination = new Pagination();
  pagination2: Pagination = new Pagination();

  constructor(
    private adminService: AdminService,
    private router: Router,
    private courseService: CourseService,
    private dialog: MatDialog,
    
  ) {}

  ngOnInit(): void {
    this.getApprovedArticles();
    this.loadCourses();
  }
  

  getApprovedArticles(): void {
    this.adminService.getApprovedArticles(this.pagination2).subscribe(
      (response) => {
        this.approvedArticles = response.data.content || [];
        this.allArticles = response.data.content || [];
        this.pagination2.totalElements=response.data.totalElements
        
      },
      (error) => {
        console.error('Error fetching approved articles:', error);
      }
    );
  }
  filterByCategory(category: string) {
    if (category === 'contentManager') {
      
      this.approvedArticles = this.allArticles.filter(article => {
        return (
          article.reviewStatus == 'CONTENT_MANAGER_REJECTED' ||
          article.reviewStatus === 'CONTENT_MANAGER_ACCEPTED'
        );
      });
      console.log("articles from content manager",this.approvedArticles.length)
  
    }
    else if(category ==="reviewer") {
      console.log(category)
      this.approvedArticles = this.approvedArticles;
      this.approvedArticles = this.allArticles.filter(article => {
        return (
          article.reviewStatus == 'REVIEWER_REJECTED' ||
          article.reviewStatus === 'REVIEWER_ACCEPTED'
        );
      });
      console.log("articles from reviewer ",this.approvedArticles.length)
    }
    else {
      console.log(category)
      this.approvedArticles = this.allArticles;
    }
  }  
  navigateToArticleDetail(articleId: number): void {
    const selectedArticle = this.approvedArticles.find(article => article.id === articleId);
    console.log('Selected Article Details:', selectedArticle);
    this.router.navigate(['/admin/detail-articles', articleId]);
  }
  /* -----  course review process  ---- */
  loadCourses(): void {
    this.courseService.getReviewCourses(this.pagination1)
      .subscribe(
        (response: ApiResponse) => {
          if (response && response.data && response.data.content) {
            this.pagination1.totalElements=response.data.totalElements
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
        this.router.navigate(['/admin/courseinfo', courseId], {
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
  onPageChange1(pagination: Pagination) {
    this.pagination1.page = pagination.page;
    this.pagination1.size = pagination.size;
    this.loadCourses()
  }
  onPageChange2(pagination: Pagination) {
    this.pagination2.page = pagination.page;
    this.pagination2.size = pagination.size;
    this.getApprovedArticles()
  }
}























