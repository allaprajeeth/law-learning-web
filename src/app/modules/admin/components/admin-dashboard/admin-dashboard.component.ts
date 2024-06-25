import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { endPoints } from 'src/app/common/constants/endpoints';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { CoursesService } from 'src/app/common/services/courses/courses.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
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
  institutions: any[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient,
    private notificationService: NotificationService,
    private coursesService: CoursesService
  ) {
    // Register Material Icons
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/dashboard.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'person',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/person.svg'
      )
    );
    this.menuItems = [
      { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
      {
        path: '/admin/all-profiles',
        title: 'User Profile',
        icon: 'person',
        class: '',
      },
    ];
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      salutation: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['INSTRUCTOR', Validators.required],
      // instituteName: [''],
      instituteId: [''],
      // jobTitle:['', Validators.required],
      // status:['', Validators.required],
      about:['', Validators.required],
    });
  }

  fetchInstitutions() {
    this.coursesService.getInstitutions().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.institutions = response.data;
          console.log('Institute data:', this.institutions);
        } else {
          console.error('Expected an array, but got:', response);
          this.institutions = [];
        }
      },
      (error) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }

  submit() {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/admin/user-profile`;
    if (this.loginForm.valid) {
      // Set instituteId in formData
      const formData = {
        ...this.loginForm.value,
        instituteId: this.loginForm.value.instituteId 
      };
      this.http.post<any>(apiUrl, formData).subscribe(
        (response) => {
          this.showMessageStatus = true;
          this.showcredentialStatus = false;
        },
        (error) => {
          if (error.error.error.type === 'DUPLICATE_RECORD') {
            this.loginForm.reset();
            this.notificationService.notify(
              'User EmailId or Mobile number already exists.'
            );
            console.log(
              'User EmailId or Mobile number already exists.Please Use other credentials'
            );
          } else {
            console.error('Error submitting form:', error);
          }
        }
      );
      console.log(formData);
    }
  }
  

  ngOnInit() {
    this.initializeForm();
    this.fetchInstitutions();
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
