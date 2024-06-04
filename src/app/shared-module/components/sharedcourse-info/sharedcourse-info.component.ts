import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-sharedcourse-info',
  templateUrl: './sharedcourse-info.component.html',
  styleUrls: ['./sharedcourse-info.component.scss']
})
export class SharedcourseInfoComponent {

  course: Course | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  courseId :number=0

  constructor(private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
   
  this.courseId = this.route.snapshot.params['id'];
  const urlParts = this.router.url.split('/');
    if (urlParts.length >= 3) {
      const role = urlParts[1]; // Extract the role from the URL
      this.courseId = parseInt(urlParts[3]); // Extract the courseId
      // Based on the role, call the appropriate function
      switch (role) {
        case 'subscriber':
          this.navigateToSubscriberCourse(this.courseId);
          break;
      
        default:
          this.navigate();
          break;
      }
    }
    
  
  }
  navigateToSubscriberCourse(courseId: number): void {
    this.courseService.getSubscriberCourseId(courseId).subscribe({
      next: (course) => {
        this.router.navigate(['/subscriber/courseinfo', courseId,course], {
          state: { course: course }
        });
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }

  navigate(){
    this.courseService.getCourseById(this.courseId).subscribe(
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
