import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { cartcourseModel } from 'src/app/common/models/cart.model';
import { CourseSearch } from 'src/app/common/models/course-search.model';
import { Course } from 'src/app/common/models/course.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import { HttpResponse } from 'src/app/common/models/response.model';
import { CourseService } from 'src/app/common/services/course.service';
import { CoursesService } from 'src/app/common/services/courses/courses.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  title = 'my-first-app';
  s3BaseURL: string = endPoints.s3BaseURL;
  avialableCourses: Course[] = [];
  cartItems: cartcourseModel[] = [];
  myCourses: Course[] = [];
  pagination: Pagination = new Pagination();
  @ViewChild('availableCoursesSection') availableCoursesSection!: ElementRef;

  constructor(
    private coursesService: CoursesService,

    private http: HttpClient ,
    private notificationService: NotificationService,

    // private http: HttpClient,
    private courseService: CourseService,
    private router: Router

  ) {
    this.pagination = new Pagination();
  }
  tooltipPosition: {
    left: string;
    right: string;
    top: string;
    display: string;
  } = { left: '0', right: 'unset', top: '0', display: 'none' };

  ngOnInit(): void {
    this.initializeCourses();
    this.availableItemsInCart();
    this.getMyCourses();
  }

  // code with api's integration

  private initializeCourses(): void {
    const url=`${endPoints.search_courses}?page=${this.pagination.page}&size=${this.pagination.size}`
    this.coursesService
      .get(url)
      .subscribe((response: HttpResponse<Course>) => {
        this.avialableCourses=[]
        for (var i in response.records) {
          
          this.avialableCourses.push(response.records[i]);
        }
        this.pagination = response.pagination;
      });
  }

  addToCart(courseId: number): void {
    let url = endPoints.secureBaseURL + '/subscriber/cart';

    this.http.post(url, [courseId]).subscribe(
      () => {
        console.log('Cart added successfully');
        this.notificationService.notify(`Added course to cart successfully`); 
      
      },
      (error) => {
        console.error('Error adding cart:', error);
      }
    );
  }

  onImageError(event: any) {
    event.target.src = 'assets/law.png';
  }

  availableItemsInCart(): void {
    const url = endPoints.secureBaseURL + '/subscriber/cart';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.data && response.data.content) {
          this.cartItems = response.data.content;
        }
      },
      (error) => {
        console.error('Error getting cart Items:', error);
      }
    );
  }
  isCourseInCart(courseId: number): boolean {
    return this.cartItems.some((item) => item.courseId === courseId);
  }

  getMyCourses(): void {
    const url = endPoints.secureBaseURL + '/courses/subscribed';
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');

    this.http.get<any>(url, { params }).subscribe((response) => {
      this.myCourses = response.data.content;
    });
  }
  
  onPageChange(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.scrollToArticlesSection()
    this.initializeCourses()

  }
  private scrollToArticlesSection() {
    if (this.availableCoursesSection) {
      this.availableCoursesSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  navigateToSubscriberCourse(courseId: number): void {
    this.courseService. getSubscriberCourseId(courseId).subscribe({
      next: (course) => {
        this.router.navigate(['/subscriber/courseinfo', courseId], {
          state: { course: course }
        });
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }

  

  showCourseContent(id: number) {
    this.router.navigate(['/freecourse'], { queryParams: { _id: id } });
  }
}
