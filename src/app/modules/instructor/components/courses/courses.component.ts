import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { isNumber } from 'src/app/common/constants/utils';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courseForm!: FormGroup;
  formData: FormData;
  courseId: number | undefined;

  constructor(private fb: FormBuilder, private router: Router, private courseService: CourseService, private route: ActivatedRoute) {
    this.formData = new FormData();
  }

  ngOnInit() {
    this.createCourseForm();
    this.courseId = this.route.snapshot.params['id'];
    console.log(typeof (this.courseId))
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
      courseFile: [null]
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

  onSubmit() {
    if (this.courseForm.valid) {
      if (this.courseId && isNumber(Number(this.courseId))) {
        this.formData.set('course', new Blob([JSON.stringify({
          title: this.courseForm.get('title')!.value,
          description: this.courseForm.get('description')!.value,
          level: this.courseForm.get('difficultyLevel')!.value,
          type: this.courseForm.get('type')!.value
        })], { type: 'application/json' }));
        this.patchCourse();
      } else {
        this.postCourse();
      }
    }
  }

  postCourse() {
    this.courseService.post<any>(endPoints.baseURL + '/secure/courses/', this.formData).subscribe(
      (response) => {
        console.log('Course created successfully:', response);
        this.router.navigate(['/instructor/upload']);
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );
  }

  patchCourse() {
    this.courseService.patch<Course>(endPoints.baseURL + '/secure/courses/' + this.courseId, this.formData).subscribe(
      (response) => {
        console.log('Course updated successfully:', response);
        this.router.navigate(['/instructor/upload']);
      },
      (error) => {
        console.error('Error updating course:', error);
      }
    );
  }
}
