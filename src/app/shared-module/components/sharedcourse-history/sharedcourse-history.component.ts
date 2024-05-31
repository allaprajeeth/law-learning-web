import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-sharedcourse-history',
  templateUrl: './sharedcourse-history.component.html',
  styleUrls: ['./sharedcourse-history.component.scss']
})
export class SharedcourseHistoryComponent implements OnInit {
  courses: Course[] = [];
  pagination: Pagination = new Pagination();
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadReviewCourses();
  }

  loadReviewCourses(): void {
 

    this.courseService.getReviewCourses(this.pagination).subscribe(
      (response: any) => {
        this.courses = response.data.content;
        this.pagination=response.data
      },
      (error) => {
        console.error('Error fetching review courses:', error);
      }
    );
  }

  getStatusStyles(status: string): any {
    switch (status) {
      case 'Under-Review':
        return { color: 'blue' };
      case 'Commented':
        return { color: 'red' };
      case 'Approved':
        return { color: 'green' };
      default:
        return {};
    }
  }

  onPageChange(pagination: Pagination) {
    this.pagination.page  = pagination.page;
    this.pagination.size  = pagination.size;
    this.loadReviewCourses()
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }
}
