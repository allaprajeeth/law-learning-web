import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/common/services/course.service';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { FormDataService } from 'src/app/common/services/form-data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courseForm: FormGroup;
  formData: FormData;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private httpClient: HttpClient,
    private courseService: CourseService,
    private formDataService: FormDataService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skillLevel: ['', Validators.required],
      courseType: ['', Validators.required],
      price: [null],
      language: ['English', Validators.required],
      courseFile: [null]
    });

    this.formData = new FormData();
  }

  onFileUpload(event: any) {
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      const file: File | null = files[0];
      if (file) {
        this.formData.append('courseFile', file);
      }
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseFormData = this.courseForm.value;
      console.log('Course Form Data:', courseFormData);

      this.formDataService.setCourseFormData(this.formData);

      this.router.navigate(['/instructor/upload']);
    }
  }

  onNext() {
    if (this.courseForm.valid) {
      const courseFormData = this.courseForm.value;
      console.log('Course Form Data:', courseFormData);

      this.formDataService.setCourseFormData(this.formData);

      this.router.navigate(['/instructor/upload']);
    }
  }
}
