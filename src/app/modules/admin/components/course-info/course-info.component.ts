import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/common/models/course.model';

@Component({
	selector: 'app-course-info',
	templateUrl: './course-info.component.html',
	styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
	course: any;
	role: string | undefined;

	constructor(private router: Router, private route: ActivatedRoute) {
		const navigation = this.router.getCurrentNavigation();
		if (navigation?.extras?.state) {
			this.course = navigation.extras.state['course'];
			this.role = navigation.extras.state['role'];
		}
	}
}
