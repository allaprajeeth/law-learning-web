import { Component} from '@angular/core';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-uploadstatus',
  templateUrl: './uploadstatus.component.html',
  styleUrls: ['./uploadstatus.component.scss'],
})

export class UploadstatusComponent {
  courses: Course[] = [];
  s3BaseURl: string;
  pagination : Pagination = new Pagination()
  constructor(private courseService: CourseService, private router:Router) {
    this.s3BaseURl = endPoints.s3BaseURL;
  }
  ngOnInit() {
    this.getCourses();
  }
  getCourses() {
    this.courseService.getCourses(this.pagination).subscribe(
      (response: any) => {
        this.courses = response.data.content;
        this.pagination.totalElements =response.data.totalElements
        this.courses.forEach((course) => {
          if (course.reviewStatus === 'SUBMITTED') {
            course.reviewStatus = 'Under Review'; 
          }
        });

      },
      (error) => {
        console.error('Error retrieving courses:', error);
      }
    );
  }
  getStatusStyles(status: string): any {
    switch (status) {
      case 'Under-Review':
        return { color: 'Blue' };
      case 'Rejected':
        return { color: 'red' };
      case 'Approved':
        return { color: 'green' };
      default:
        return {};
    }
  }

  onPageChange(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.getCourses() 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
}
