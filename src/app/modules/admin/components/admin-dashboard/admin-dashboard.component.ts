// admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  loginForm!: FormGroup;
  showMessageStatus: boolean = false;
  showcredentialStatus: boolean = true;
  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  selectedRole: string = 'instructor';
  menuItems: RouteInfo[];

  constructor(private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, 
    private formBuilder: FormBuilder,
     private location: Location,
     private http: HttpClient) {
    // Register Material Icons
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'person',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg')
    );
    this.menuItems = [
      { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
      { path: '/admin/all-profiles', title: 'User Profile', icon: 'person', class: '' },
    
    ];


  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      salutation :['',Validators.required],
      gender :['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['INSTRUCTOR', Validators.required],
      jobTitle:['', Validators.required],
      status:['', Validators.required],
      about:['', Validators.required],

    });
  }

  submit() {
    const baseUrl = endPoints.secureBaseURL;
        const apiUrl = baseUrl + `/admin/user-profile`;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.http.post<any>(apiUrl, formData).subscribe(response => {
        this.showMessageStatus = true;
        this.showcredentialStatus = false;
    console.log('Form values:', this.loginForm.value);
        console.log('Form submitted successfully!', response);
      }, error => {
        console.error('Error submitting form:', error);
      });
    }
  }
  
  ngOnInit() {
    this.initializeForm();
  }

  get formControls() {
    return this.loginForm.controls;
  }

  // Check if the form is valid
  isFormValid() {
    return this.loginForm.valid;
  }

  isMobileMenu() {
    // Adjust the logic for checking mobile menu as needed
    return window.innerWidth <= 991;
  }

  closePage() {
    // this.closeClicked.emit();
    location.reload(); 
  }


}


interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
