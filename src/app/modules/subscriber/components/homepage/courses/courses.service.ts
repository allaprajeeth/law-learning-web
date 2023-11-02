import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { COURSES_MOCK } from 'src/app/common/mocks/courses.mock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  constructor() { }

  getCourses() {
    return of(COURSES_MOCK);
  }
}
