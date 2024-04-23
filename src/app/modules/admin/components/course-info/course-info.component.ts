import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  course: Course | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    // Get course ID from route parameters
    const courseId = this.route.snapshot.params['id'];
    
    this.courseService.getCourseById(courseId).subscribe(
      (response) => {
        console.log('Course Response:', response);
        if (response && response.data) {
          this.course = response.data as Course; 
          this.isLoading = false;
        } else {
          this.errorMessage = 'Invalid response format';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching course details';
        console.error(this.errorMessage, error);
        this.isLoading = false;
      }
    );
  }
}
