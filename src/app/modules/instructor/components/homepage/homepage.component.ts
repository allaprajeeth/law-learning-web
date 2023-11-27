import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ActivatedRoute } from '@angular/router';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-unique-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  headings: string[] = ['Course 1', 'Course 2', 'Course 3', 'Course 4'];

  // constructor(private modelService: ModalService) {}

  openCourseInfo(heading: string) {
    this.modelService.changeExpanded([heading]);
    // Add code to navigate to CourseInfo component
  }



  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

   constructor(private route: ActivatedRoute, private modelService: ModalService) { }

  coursesForSubmission: any[] = [];
  coursesUnderReview: any[] = [];
  approvedCourses: any[] = [];
  commentedCourses: any[] = [];

  uploadedimages: string[] = [];
  rejectedimages: string[] = [];
  approvedcoursesimages: string[] = [];
  underreviewimages: string[] = [];

  uploadedCoursesDurations: string[] = [];
  rejectedCoursesDurations: string[] = [];
  approvedCoursesDurations: string[] = [];
  underreviewDurations: string[] = [];

  coursePrice = [
    3199, 3029, 3229, 3009, 3599, 3055, 3199, 3327, 3087, 3299, 3172, 3449,
  ];

  
  approvedCoursesHeadings: string[] = [
    "Real Estate Law Made Simple",
    "Intellectual Property Law",
    "Family Law Fundamentals",
    "Environmental Law Explained",
    "International Law and Diplomacy",
    "Civil Rights and Liberties",
    "Contract Law Demystified",
    "Human Rights Law",
    "Introduction to Criminal Law",
    "Business Law Essentials",
    "Torts and Personal Injury Law",
    "Labor and Employment Law",
  ];

  underreviewHeadings: string[] = [
    "Bankruptcy Law",
    "Healthcare Law",
    "Immigration Law 101",
    "Estate Planning and Probate Law",
  ];

  uploadedCoursesHeadings: string[] = [
    "Cybersecurity and Privacy Law",
    "Tax Law Essentials",
    "Criminal Procedure",
    "Administrative Law",
  ];

  rejectedCoursesHeadings: string[] = [
    "Business Law Essentials for Entrepreneurs",
    "Torts and Personal Injury Law",
  ];

  approvedCoursesAuthors: string[] = [
    'John Smith', 'Mary Johnson', 'David Wilson', 'Sarah Davis', 'Michael Brown', 'Jennifer White',
    'Robert Lee', 'Susan Anderson', 'Charles Harris', 'Amanda Lewis', 'Laura Roberts', 'Robert Lee',
  ];

  underreviewAuthors: string[] = [
    'William Jackson', 'Laura Roberts', 'Richard Martin', 'Lisa Miller',
  ];

  uploadedCoursesAuthors: string[] = [
    'James Young', 'Elizabeth Wilson', 'Thomas Baker', 'Patricia Moore',
  ];

  rejectedCoursesAuthors: string[] = [
    'Daniel Clark', 'Linda Taylor',
  ];

  uploadedCoursesText: string[] = [
    'Expert | Detailed Course',
    'Beginner | Crash Course',
    'Intermediate | Detailed Course',
    'Student | Crash Course',
  ];

  rejectedCoursesText: string[] = [
    'Intermediate | Detailed Course',
    'Student | Crash Course',
  ];

  underreviewText: string[] = [
    'Expert | Detailed Course',
    'Student | Crash Course',
    'Beginner | Crash Course',
    'Intermediate | Detailed Course',
  ];

  approvedCoursesText: string[] = [
    'Expert | Detailed Course',
    'Beginner | Crash Course',
    'Intermediate | Detailed Course',
    'Student | Crash Course',
    'Beginner | Detailed Course',
    'Intermediate | Crash Course',
    'Student | Detailed Course',
    'Expert | Crash Course',
    'Student | Crash Course',
    'Beginner | Crash Course',
    'Intermediate | Detailed Course',
    'Expert | Detailed Course',
  ];

  randomUploadValues: number[] = [];
  randomRejectedValues: number[] = [];
  randomunderreviewValues: number[] = [];

  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  uploadSubscribers: string[] = [];
  approvedCourseSubscribers: string[] = [];
  underreviewSubscribers: string[] = [];

  ngOnInit(): void {

    this.coursesForSubmission = this.generateCoursesData(4, this.uploadedimages, this.randomUploadValues,
      this.uploadSubscribers, this.uploadedCoursesDurations);

    this.coursesUnderReview = this.generateCoursesData(2, this.underreviewimages, this.randomunderreviewValues,
      this.underreviewSubscribers, this.underreviewDurations);

    this.approvedCourses = this.generateCoursesData(12, this.approvedcoursesimages, [], this.approvedCourseSubscribers,
      this.approvedCoursesDurations);

    this.commentedCourses = this.generateCoursesData(2, this.rejectedimages, this.randomRejectedValues, [], this.rejectedCoursesDurations);
  }

  generateCoursesData(count: number, images: string[], randomValues: number[],
    subscribers: string[], durations: string[]): any[] {
    const courses: any[] = [];

    for (let i = 0; i < count; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      images.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      randomValues.push(randomValue);

      if (subscribers.length > 0) {
        const randomSubscribersIndex = Math.floor(Math.random() * this.subscribersValues.length);
        subscribers.push(this.subscribersValues[randomSubscribersIndex]);
      }

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      durations.push(duration);

      courses.push({
        // Add other properties as needed based on your actual data structure
        title: `Course ${i + 1}`,
        // ...
      });
    }

    return courses;
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
