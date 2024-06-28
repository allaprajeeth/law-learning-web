import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';
import { HttpResponse } from '../../models/response.model';
import { endPoints } from '../../constants/endpoints';
import { CourseSearch } from '../../models/course-search.model';
import { Pagination } from '../../models/pagination.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('paidCoursesSection') paidCourseSection!: ElementRef;
  instituteCourses: { [key: string]: Course[] } = {};
  curatedCourses: Course[] = [];
   executiveCourses: Course[] = [];
  s3BaseURL: string = endPoints.s3BaseURL;
  selectedCategory: string = '';
  selectedCourseType: string = '';
  title = 'my-first-app';
  pagination1: Pagination = new Pagination();
  pagination2: Pagination = new Pagination();
  institutes: any[] = []; 

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializecuratedCourses({ isPublic: true });

    this.getAllInstitutes().subscribe(
      (response) => {
        console.log('Institutes data:', response); // Log the data structure
        if (response && Array.isArray(response.data)) {
          this.institutes = response.data;
          this.institutes.forEach((institute: any) => {
            this.initializePaidCoursesHeadings(institute.name);
          });
        } else {
          console.error('Unexpected data format for institutes', response);
        }
      },
      (error) => {
        console.error('Error fetching institutes', error);
      }
    );
  }

  getAllInstitutes(): Observable<any> {
    const url = `${endPoints.secureBaseURL}${endPoints.course}/institutions`;
    return this.http.get<any>(url);
  }

  private initializecuratedCourses(search: CourseSearch): void {
    const url = `${endPoints.search_courses}?page=${this.pagination2.page}&size=${this.pagination2.size}&sort=createdDate,desc`;
    const queryParams = { ...search };
    this.coursesService
      .get(url, queryParams)
      .subscribe((response: HttpResponse<Course>) => {
        for (var i in response.records) {
          this.curatedCourses.push(response.records[i]);
        }
        this.pagination1 = response.pagination;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  private initializePaidCoursesHeadings(instituteName: string): void {
    const url = `${endPoints.search_courses}?page=${this.pagination2.page}&size=${this.pagination2.size}&sort=createdDate,desc&institute=${instituteName}`;
  
    this.coursesService.get(url).subscribe((response: HttpResponse<Course>) => {
      this.instituteCourses[instituteName] = response.records;
      this.pagination2 = response.pagination;
    });
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
    this.initializecuratedCourses({ isPublic: true });
  }

  onPageChange2(pagination: Pagination) {
    this.pagination2.page = pagination.page;
    this.pagination2.size = pagination.size;
    // this.initializePaidCoursesHeadings({ isPublic: false }, true);
    this.scrollToArticlesSection();
  }
  private scrollToArticlesSection() {
    if (this.paidCourseSection) {
      this.paidCourseSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
