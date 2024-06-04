import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Course } from 'src/app/common/models/course.model';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  
  course: Course | null = null;
  @Input() courseData: Course | undefined; 
  courseInformation: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient , 

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const courseId = paramMap.get('id');
      // Fetch course data from API
      this.http.get<Course>(`${endPoints.baseURL}/secure/subscriber/course/${courseId}`).subscribe(
        (data) => {
          // Assign retrieved course data to courseData property
          this.courseData = data;
        },
        (error) => {
          console.error('Error fetching course data:', error);
        }
      );
    });
  }
}



