import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdvisorProfile, InstructorProfile } from '../../models/instructor.model'
import { Router } from '@angular/router';
import { endPoints } from '../../constants/endpoints';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {
  


  photo='https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
  
  constructor(private router: Router,private http: HttpClient) { }
  navigateToAdvisorInfo(advisorId: any) {
    const currentUrl = this.router.url;
    let routePrefix = '';
    if (currentUrl.includes('/admin')) {
      routePrefix = '/admin/advisorInfo';
    } else if (currentUrl.includes('/instructor')) {
      routePrefix = '/instructor/advisorInfo';
    } else if (currentUrl.includes('/authentication')) {
      routePrefix = '/authentication/advisorInfo';
    } else if (currentUrl.includes('/reviewer')) {
      routePrefix = '/reviewer/advisorInfo';
    } else if (currentUrl.includes('subscriber')) {
      routePrefix = 'subscriber/advisorInfo';
    }
    else {
      routePrefix = '/advisorInfo'
    }
    this.router.navigate([routePrefix,advisorId]);
    console.log("advisorId" ,advisorId) 

  }

  navigateToInstructorInfo(instructorId: any) {
    const currentUrl = this.router.url;
    let routePrefix = '';
    if (currentUrl.includes('/admin')) {
      routePrefix = '/admin/instructorinfo';
    } else if (currentUrl.includes('/instructor')) {
      routePrefix = '/instructor/instructorinfo';
    } else if (currentUrl.includes('/authentication')) {
      routePrefix = '/authentication/instructorinfo';
    } else if (currentUrl.includes('/reviewer')) {
      routePrefix = '/reviewer/instructorinfo';
    } else if (currentUrl.includes('subscriber')) {
      routePrefix = 'subscriber/instructorinfo';
    }
    else {
      routePrefix = '/instructorinfo'
    }
    this.router.navigate([routePrefix,instructorId]);
    console.log("advisorId" ,instructorId) 

  }

  ngOnInit(): void {
    this.fetchInstrctorProfiles();
    this.fetchAdvisorProfiles()
  }
  instructorProfiles: InstructorProfile[] = [];
  advisorProfiles:AdvisorProfile[] = [];

  fetchInstrctorProfiles(): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl =baseUrl+ `/instructors/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      this.instructorProfiles = response.data.content;
    });
  }

  fetchAdvisorProfiles(): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl =baseUrl+ `/advisor/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      this.advisorProfiles = response.data.content;
    });
  }

}

