import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';
import { CourseReview } from 'src/app/common/models/coursesreview.model';
import { Section } from 'src/app/common/models/section.model';
import { SubSection } from 'src/app/common/models/sub-sections.model';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {

  course: Course | null = null;
  
  
  
}


