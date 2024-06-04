import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';
import { HttpResponse } from '../../models/response.model';
import { endPoints } from '../../constants/endpoints';
import { CourseSearch } from '../../models/course-search.model';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('paidCoursesSection') paidCourseSection!: ElementRef;
  paidCourses: any[] = [];
  freeCourses: Course[] = [];
  s3BaseURL: string = endPoints.s3BaseURL;
  selectedCategory: string = '';
  selectedCourseType: string = '';
  title = 'my-first-app';
  pagination1: Pagination = new Pagination();
  pagination2: Pagination = new Pagination();

  constructor(private router: Router, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.initializeFreeCoursesHeadings({ isPublic: true });
    this.initializePaidCoursesHeadings({ isPublic: false }, true);
  }

  private initializeFreeCoursesHeadings(search: CourseSearch): void {
    const url=`${endPoints.search_courses}?page=${this.pagination2.page}&size=${this.pagination2.size}`
    const queryParams = { ...search};
    this.coursesService.get(url,queryParams,)
      .subscribe((response: HttpResponse<Course>) => {
        for (var i in response.records) {
          this.freeCourses.push(response.records[i]);
        }
        this.pagination1 = response.pagination;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  private initializePaidCoursesHeadings(search: CourseSearch, reload: boolean): void {
    const url=`${endPoints.search_courses}?page=${this.pagination2.page}&size=${this.pagination2.size}`
    const queryParams = { ...search};
    this.coursesService.get(url ,queryParams )
      .subscribe((response: HttpResponse<Course>) => {
        if (reload) this.paidCourses = [];
        for (var i in response.records) {
          this.paidCourses.push(response.records[i]);
        }
        this.pagination2 = response.pagination;
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

  onPageChange1(pagination: Pagination) {
    this.pagination1.page = pagination.page;
    this.pagination1.size = pagination.size;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.initializeFreeCoursesHeadings({ isPublic: true });
  }

  onPageChange2(pagination: Pagination) {
    this.pagination2.page = pagination.page;
    this.pagination2.size = pagination.size;
    this.initializePaidCoursesHeadings({ isPublic: false }, true);
    this.scrollToArticlesSection()
    
  }
  private scrollToArticlesSection() {
    if (this.paidCourseSection) {
      this.paidCourseSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
