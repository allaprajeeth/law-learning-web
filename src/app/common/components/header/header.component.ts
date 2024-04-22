import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';
import { HttpResponse } from '../../models/response.model';
import { endPoints } from '../../constants/endpoints';
import { CourseSearch } from '../../models/course-search.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  paidCourses: any[] = [];
  freeCourses: Course[] = [];
  s3BaseURL: string = endPoints.s3BaseURL;
  selectedCategory: string = '';
  selectedCourseType: string = '';
  title = 'my-first-app';

  constructor(private router: Router, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.initializeFreeCoursesHeadings({ isPublic: true });
    this.initializePaidCoursesHeadings({ isPublic: false }, true);
  }

  private initializeFreeCoursesHeadings(search: CourseSearch): void {
    this.coursesService
      .get(search, endPoints.search_courses)
      .subscribe((response: HttpResponse<Course>) => {
        for (var i in response.records) {
          this.freeCourses.push(response.records[i]);
        }
      });
  }

  private initializePaidCoursesHeadings(search: CourseSearch, reload: boolean): void {
    this.coursesService
      .get(search, endPoints.search_courses)
      .subscribe((response: HttpResponse<Course>) => {
        if (reload) this.paidCourses = [];
        for (var i in response.records) {
          this.paidCourses.push(response.records[i]);
        }
      });
  }

  updateSelectedCourseType(level: string, courseType: string): void {
    this.initializePaidCoursesHeadings(
      { type: courseType, level: level },
      true
    );
  }

  showCourseContent(id: number) {
    this.router.navigate(['/freecourse'], { queryParams: { _id: id } });
  }

  onImageError(event: any) {
    event.target.src = 'assets/law.png';
  }
}
