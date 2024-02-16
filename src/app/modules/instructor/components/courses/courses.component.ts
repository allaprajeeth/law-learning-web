import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courseForm: FormGroup;
  formData: FormData;
  currentCourseId: number | null;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private httpClient: HttpClient,
    private courseService: CourseService
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
    this.currentCourseId = null;
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
      
      if (this.currentCourseId === null) { 

      this.formData.set('course', new Blob([JSON.stringify({
        title: this.courseForm.get('title')!.value,
        description: this.courseForm.get('description')!.value,
        level: this.courseForm.get('skillLevel')!.value,
        type: this.courseForm.get('courseType')!.value
      })], { type: 'application/json' }));



      this.courseService.post<any>(endPoints.baseURL + '/secure/courses', this.formData).subscribe(
        (response) => {
          console.log('course form submitted successfully:', response);
          this.router.navigate(['/instructor/upload']);
        },
        (error) => {
          console.error('Error submitting course:', error);
        }
      );
      }else{
        this.loadCourseDetails(this.currentCourseId);
        
        this.courseService.post<any>(endPoints.baseURL + '/secure/courses/' + this.currentCourseId, this.formData).subscribe(
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
  }

  private loadCourseDetails(courseId: number) {
   
    this.courseService.getCourseDetails(courseId).subscribe((courseDetails) => {
      this.courseForm.patchValue(courseDetails);
     });
  }

  onEditCourse(courseId: number) {
  this.courseService.getCourseDetails(courseId).subscribe(
    (courseDetails) => {
      console.log('Course Details for ID ' + courseId + ':', courseDetails);
    },
    (error) => {
      console.error('Error retrieving course details:', error);
    }
  );
}

}
