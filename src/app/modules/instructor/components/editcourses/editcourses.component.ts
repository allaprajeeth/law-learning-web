import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editcourses',
  templateUrl: './editcourses.component.html',
  styleUrls: ['./editcourses.component.scss']
})

export class EditcoursesComponent implements OnInit {
  // Declare properties for the form fields
  title: string = '';
  description: string = '';
  skillLevel: string = '';
  courseType: string = '';

  ngOnInit() {
    // Load data from local storage if available
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const formData = JSON.parse(storedData);
      this.populateForm(formData);
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    // Handle popstate event (backward/forward navigation)
    // You can perform custom actions here
  }

  // Helper function to populate form fields
  private populateForm(formData: any) {
    this.title = formData.title;
    this.description = formData.description;
    this.skillLevel = formData.skillLevel;
    this.courseType = formData.courseType;
  }

  // Event handler for form submission
  onSubmit(form: NgForm) {
    // Save the form data to local storage
    const formData = {
      title: form.value.title,
      description: form.value.description,
      skillLevel: form.value.skillLevel,
      courseType: form.value.courseType,
    };
    console.log('Form Data Saved:', formData);

    localStorage.setItem('formData', JSON.stringify(formData));
    return false; // Prevent default form submission
  }
}

