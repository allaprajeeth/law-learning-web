// admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Location } from '@angular/common';

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

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private formBuilder: FormBuilder, private location: Location) {
    // Register Material Icons
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'person',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg')
    );

    // Initialize menuItems
    this.menuItems = [
      { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
      { path: '/admin/all-profiles', title: 'User Profile', icon: 'person', class: '' },
      // Add more menu items
    ];

    // // Initialize the form with validators
    // this.myForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    //   selectedRole: ['instructor', Validators.required]
    // });
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedRole: ['instructor', Validators.required]
    });
  }

  send() {
    // Implement your login logic here
    this.showMessageStatus = true;
    this.showcredentialStatus = false;
    console.log('Form values:', this.loginForm.value);
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

  // send() {
  //   // Implement your login logic here
  //   // console.log('Login clicked');
  //   // console.log('Username:', this.username);
  //   // console.log('Email:', this.email);
  //   // console.log('Phone Number:', this.phoneNumber);
  // }
}

// Define the RouteInfo interface
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
