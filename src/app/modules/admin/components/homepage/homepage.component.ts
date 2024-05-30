import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ArticleApiResponse, Article } from '../admin.model';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { endPoints } from 'src/app/common/constants/endpoints';
import { ProfileService } from '../profile.service';
interface ApiResponse {
  data: {
    content: Course[];
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
  selectedCategory: string | undefined;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private courseService: CourseService,
    private dialog: MatDialog,
    private profile:ProfileService
  ) {}

  ngOnInit(): void {
    this.getApprovedArticles();
    this.loadCourses();
    this.selectedCategory = this.profile.getCategory();
  }
  

  getApprovedArticles(): void {
    this.adminService.getApprovedArticles().subscribe(
      (response) => {
        this.approvedArticles = response.data.content || [];
        this.allArticles = response.data.content || [];
      },
      (error) => {
        console.error('Error fetching approved articles:', error);
      }
    );
  }
  filterByCategory(category: string) {
    this.profile.setCategory(category);
    this.selectedCategory = category;
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
}























