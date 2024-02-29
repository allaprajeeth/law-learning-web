import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CoursesService } from '../../services/courses/courses.service';
import { endPoints } from '../../constants/endpoints';
import { Course } from '../../models/course.model';
import { HttpResponse } from '../../models/response.model';

@Component({
  selector: 'app-freecourse',
  templateUrl: './freecourse.component.html',
  styleUrls: ['./freecourse.component.scss']
})
export class FreecourseComponent {

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  id$!: Observable<string | null>;
  course: Course = new Course();
  
  ngOnInit() {
    this.id$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('_id')),
    );

    this.id$.subscribe(_id => {
      this.getCourseDetails(_id);
    });
  }
  getCourseDetails(_id: any) {
    if(_id) {
      this.coursesService.getById('/course/'+_id+'/overview', {}).subscribe((response: HttpResponse<Course>) => {
        if(response.records && response.records.length > 0) {
          this.course = response.records[0];
          console.log()
        }
      });
    }
  }
}
