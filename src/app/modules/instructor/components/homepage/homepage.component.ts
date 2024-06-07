import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  courses: Course[] = [];
  s3BaseURl: string;
  pagination: Pagination = new Pagination();

  constructor(private courseService: CourseService, private router: Router) {
    this.s3BaseURl = endPoints.s3BaseURL;
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses(this.pagination).subscribe(
      (response: any) => {
        this.courses = response.data.content;
        this.pagination.totalElements = response.data.totalElements;
      },
      (error) => {
        console.error('Error retrieving courses:', error);
      }
    );
  }

  onEditCourse(courseId: number) {
    this.router.navigate(['/instructor/courses', courseId]);
  }

  onImageError(event: any) {
    event.target.src = 'assets/law.png';
  }

  onPageChange(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.getCourses();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
