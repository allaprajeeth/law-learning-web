import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvisorProfile, InstructorProfile } from '../../models/instructor.model'
import { Router } from '@angular/router';
import { endPoints } from '../../constants/endpoints';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {
  
  teacherProfiles = [
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'Aditya Sood',
      title: 'Instructional Designer',
      description: '5+ years of experience including in the EdTech industry as a learning experience designer. Has worked as an assistant professor and published several scientific papers.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'Jane Doe',
      title: 'Math Teacher',
      description: '10+ years of experience teaching math to students of all ages. Passionate about making math fun and accessible to everyone.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    
  ];
  advisorProfile=[
    {
      photo:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'Michael Johnson',
      title: 'Mathematics Tutor',
      description: 'Experienced mathematics tutor with 12+ years of teaching mathematics. I believe that every student can excel in math with the right guidance and practice.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'Michael Johnson',
      title: 'Mathematics Tutor',
      description: 'Experienced mathematics tutor with 12+ years of teaching mathematics. I believe that every student can excel in math with the right guidance and practice.'
    },
    {
      photo:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'Sarah Davis',
      title: 'Language Arts Specialist',
      description: 'Dedicated to helping students improve their language arts skills. I have worked with students of all ages and levels to enhance their reading, writing, and communication abilities.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'Michael Johnson',
      title: 'Mathematics Tutor',
      description: 'Experienced mathematics tutor with 12+ years of teaching mathematics. I believe that every student can excel in math with the right guidance and practice.'
    },
    {
      photo: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      name: 'David Lee',
      title: 'History Teacher',
      description: 'Passionate about history and committed to making it engaging for students. I have taught history for 10+ years and believe that understanding the past is essential for shaping the future.'
    }
  ]

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

  

 
  // navigateToInstructorInfo(instructorId:any) {
  //   this.router.navigate(['/instructor/instructorinfo',instructorId]); 
  // }


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

