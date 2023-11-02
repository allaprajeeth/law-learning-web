import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {

  constructor(private coursesService: CoursesService){

  }

  vm$ = this.coursesService.getCourses();
}
