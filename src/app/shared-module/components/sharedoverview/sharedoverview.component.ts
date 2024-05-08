import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { isNumber } from 'src/app/common/constants/utils';
import { Course } from 'src/app/common/models/course.model';
import { CoursesService } from 'src/app/common/services/courses/courses.service';

@Component({
  selector: 'app-sharedoverview',
  templateUrl: './sharedoverview.component.html',
  styleUrls: ['./sharedoverview.component.scss'],
})
export class SharedoverviewComponent {
  @Input() course: Course = new Course;
  courseId: number | undefined;
   numberOfSubsections = 0;
  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.course && this.course.sections) {
      this.numberOfSubsections = this.course.sections.reduce((acc, section) => {
        return acc + (section.subSections ? section.subSections.length : 0);
      }, 0);
    }  
  } 
  isSubmitted(subsection: any): boolean {
    return subsection.reviewStatus === 'SUBMITTED';
  }  
}
