import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerService } from '../reviewer.service';
import { Article } from '../reviewer.model';
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
  approvedArticles: Article[] = [];
  courses!: Course[];
  s3BaseURL: string = endPoints.s3BaseURL; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewerService:ReviewerService,
    private courseService: CourseService,
    private dialog: MatDialog,
    
    ) { }

  ngOnInit(): void {
    this.getApprovedArticles();
    this.loadCourses();
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
    const selectedArticle = this.approvedArticles.find(article => article.id === articleId);
    console.log('Selected Article Details:', selectedArticle);
    this.router.navigate(['/reviewer/detail-articles', articleId]);
  }

  /* -----  course review process  ---- */
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
        this.router.navigate(['/reviewer/courseinfo', courseId], {
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
}

