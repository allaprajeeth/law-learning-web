import { Component } from '@angular/core';
import { Course } from 'src/app/common/models/course.model';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  
  course: Course | null = null;
}
