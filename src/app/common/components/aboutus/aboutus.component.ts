import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {
  teacherProfiles = [
    {
      photo: 'teacher-photo-1.png',
      name: 'Aditya Sood',
      title: 'Instructional Designer',
      description: '5+ years of experience including in the EdTech industry as a learning experience designer. Has worked as an assistant professor and published several scientific papers.'
    },
    {
      photo: 'teacher-photo-2.png',
      name: 'Jane Doe',
      title: 'Math Teacher',
      description: '10+ years of experience teaching math to students of all ages. Passionate about making math fun and accessible to everyone.'
    },
    {
      photo: 'teacher-photo-3.png',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'teacher-photo-3.png',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'teacher-photo-3.png',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'teacher-photo-3.png',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    {
      photo: 'teacher-photo-3.png',
      name: 'John Smith',
      title: 'English Teacher',
      description: '5+ years of experience teaching English to students of all ages. Loves helping students develop their reading, writing, and speaking skills.'
    },
    
  ];
  advisorProfiles=[
    {
      photo: 'advisor-photo-5.png',
      name: 'Michael Johnson',
      title: 'Mathematics Tutor',
      description: 'Experienced mathematics tutor with 12+ years of teaching mathematics. I believe that every student can excel in math with the right guidance and practice.'
    },
    {
      photo: 'advisor-photo-5.png',
      name: 'Michael Johnson',
      title: 'Mathematics Tutor',
      description: 'Experienced mathematics tutor with 12+ years of teaching mathematics. I believe that every student can excel in math with the right guidance and practice.'
    },
    {
      photo: 'advisor-photo-6.png',
      name: 'Sarah Davis',
      title: 'Language Arts Specialist',
      description: 'Dedicated to helping students improve their language arts skills. I have worked with students of all ages and levels to enhance their reading, writing, and communication abilities.'
    },
    {
      photo: 'advisor-photo-5.png',
      name: 'Michael Johnson',
      title: 'Mathematics Tutor',
      description: 'Experienced mathematics tutor with 12+ years of teaching mathematics. I believe that every student can excel in math with the right guidance and practice.'
    },
    {
      photo: 'advisor-photo-7.png',
      name: 'David Lee',
      title: 'History Teacher',
      description: 'Passionate about history and committed to making it engaging for students. I have taught history for 10+ years and believe that understanding the past is essential for shaping the future.'
    }
    
    
    
    
  ]
  
}
