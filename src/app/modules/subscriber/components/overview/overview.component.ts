import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/common/enums/role.enums';
import { ReviewStatus } from 'src/app/common/enums/status.enums';
import { Course } from 'src/app/common/models/course.model';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';
// import { CoursesService } from 'src/app/common/services/courses/courses.service';
import { CourseService } from 'src/app/common/services/course.service';
 

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() course: Course = new Course;
  courseId: number | undefined;
  

  constructor(
    // private courseService: CoursesService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthTokenService,
    private snackBar: MatSnackBar
 
  ) {}


}
