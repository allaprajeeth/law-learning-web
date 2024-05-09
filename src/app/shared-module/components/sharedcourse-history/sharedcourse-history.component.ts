import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';

@Component({
  selector: 'app-sharedcourse-history',
  templateUrl: './sharedcourse-history.component.html',
  styleUrls: ['./sharedcourse-history.component.scss']
})
export class SharedcourseHistoryComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadReviewCourses();
  }

  loadReviewCourses(): void {
    const number = 0; 
    const size = 20;

    this.courseService.getReviewCourses(number, size).subscribe(
      (response: any) => {
        this.courses = response.data.content;
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
}
