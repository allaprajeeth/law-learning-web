import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { isNumber } from 'src/app/common/constants/utils';
import { BaseModel } from 'src/app/common/models/base.model';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';

interface CourseDetails {
  data: {
    sections?: {
      content?: Course | Course[] | undefined;
    } | undefined;
  } | undefined;
}



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courseForm!: FormGroup;
  formData: FormData;
  courseId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.formData = new FormData();
    // Initialize the form
    //  this.createCourseForm();
  }

  ngOnInit() {
    // Create the form when the component is initialized
    this.createCourseForm();

    this.courseId = this.route.snapshot.params['id'];
    console.log(typeof this.courseId);

    if (this.courseId && isNumber(Number(this.courseId))) {
      this.loadCourseDetails(this.courseId);
    }
  }

  private loadCourseDetails(courseId: number) {
    this.courseService.getCourseDetails(courseId).subscribe((courseDetails) => {
      this.courseForm.patchValue(courseDetails.data || {});
    });
  }

  createCourseForm() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      type: ['', Validators.required],
      price: [null],
      language: ['English', Validators.required],
      courseFile: [null],
    });
  }

  onFileUpload(event: any) {
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      const file: File | null = files[0];
      if (file) {
        this.formData.append('file', file);
      }
    }
  }
  onSave() {
    if (this.courseForm.valid) {
      this.formData.set(
        'course',
        new Blob([JSON.stringify({
          title: this.courseForm.get('title')!.value,
          description: this.courseForm.get('description')!.value,
          level: this.courseForm.get('difficultyLevel')!.value,
          type: this.courseForm.get('type')!.value,
        })], { type: 'application/json' })
      );
  
      if (this.courseId && isNumber(Number(this.courseId))) {
        // this.patchCourse();
        this.updateCourse();
      } else {
        this.postCourse();
        this.createCourse();
      }
    }
  }
  
  
  postCourse() {
    this.courseService.post<any>(endPoints.baseURL + '/secure/courses', this.formData).subscribe(
      (response: any) => {
        console.log('Course created successfully:', response);
        const courseId = response.data?.id;
        if (courseId !== undefined) {
          this.router.navigate(['/instructor/upload', courseId]);
        } else {
          console.error('Error: Course id is undefined in the response.');
        }
      },
      (error: any) => {
        console.error('Error creating course:', error);
      }
    );
  }
  // Method to create a new course
 createCourse() {
  // Call the service to create a new course
  this.courseService.createCourse(this.courseForm.value).subscribe(
    
  );
}
updateCourse() {
  if (this.courseId && isNumber(Number(this.courseId))) {
    this.courseService.updateCourse(this.courseId, this.courseForm.value).subscribe(
      
    );
  }
}

onNext() {
  if (this.courseId && isNumber(Number(this.courseId))) {
    this.courseService.getCourseDetails(this.courseId).subscribe((courseDetails: BaseModel<Course>) => {
      const details: CourseDetails = courseDetails as CourseDetails;
      if (details && details.data && details.data.sections && details.data.sections.content) {
        // Sections exist, navigate to existing upload form with details
        this.router.navigate(['/instructor/upload', this.courseId]);
      } else {
        // Sections do not exist, navigate to new upload form
        this.router.navigate(['/instructor/upload', this.courseId]);
      }
    });
    
  } else {
    console.error('Invalid Course ID');
  }
}


}