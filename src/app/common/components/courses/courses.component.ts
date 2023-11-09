import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courseForm!: FormGroup;
  isFormValid: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skillLevel: ['', Validators.required], 
      courseType: ['', Validators.required],
      // hasTest: ['', Validators.required]
    });

    // Subscribe to specific form control changes to update the isFormValid variable
    this.courseForm.get('title')?.statusChanges.subscribe(() => {
      this.updateFormValidity();
    });

    this.courseForm.get('description')?.statusChanges.subscribe(() => {
      this.updateFormValidity();
    });

    this.courseForm.get('skillLevel')?.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });
    this.courseForm.get('courseType')?.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });
    // this.courseForm.get('hasTest')?.valueChanges.subscribe(() => {
    //   this.updateFormValidity();
    // });
  }

  updateFormValidity() {
    this.isFormValid = (this.courseForm.get('title')?.valid ?? false) && 
                      (this.courseForm.get('description')?.valid ?? false) && 
                      (this.courseForm.get('skillLevel')?.valid ?? false) &&
                      (this.courseForm.get('courseType')?.valid ?? false);
                      // (this.courseForm.get('hasTest')?.valid ?? false);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.router.navigate(['/upload']);
      // Handle form submission logic here
      // For example, you can navigate to the next step/page
    } else {
      // Form is invalid, handle it as needed
    }
  }

  
}
