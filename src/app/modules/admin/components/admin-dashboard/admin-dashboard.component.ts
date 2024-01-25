// admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  loginForm: FormGroup;

  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  selectedRole: string = 'instructor';

  menuItems: RouteInfo[];

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private formBuilder: FormBuilder) {
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

    // Initialize the form with validators
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedRole: ['instructor', Validators.required]
    });
  }

  ngOnInit() {
    // You can perform additional initialization logic here
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

  send() {
    // Implement your login logic here
    // console.log('Login clicked');
    // console.log('Username:', this.username);
    // console.log('Email:', this.email);
    // console.log('Phone Number:', this.phoneNumber);
  }
}

// Define the RouteInfo interface
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
