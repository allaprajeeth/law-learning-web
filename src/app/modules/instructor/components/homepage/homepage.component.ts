import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-unique-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

  constructor(private route: ActivatedRoute) { }

  uploadedimages: string[] = [];
  rejectedimages: string[] = [];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  uploadedCoursesDurations: string[] = [];
  rejectedCoursesDurations: string[] = [];
  myCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];

  availableCoursesHeadings: string[] = [
    "Introduction to Criminal Law",
    "Contract Law Demystified",
    "Environmental Law Explained",
    "Intellectual Property Law",
    "Civil Rights and Liberties",
    "Family Law Fundamentals",
    "Real Estate Law Made Simple",
    "Business Law Essentials for Entrepreneurs",
    "Human Rights Law",
    "Labor and Employment Law",
    "International Law and Diplomacy",
    "Torts and Personal Injury Law",
  ];

  myCoursesHeadings: string[] = [
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

  availableCoursesAuthors: string[] = [
    'John Smith',
    'Mary Johnson',
    'David Wilson',
    'Sarah Davis',
    'Michael Brown',
    'Jennifer White',
    'Robert Lee',
    'Susan Anderson',
    'Charles Harris',
    'Amanda Lewis',
    'Laura Roberts',
    'Robert Lee',
  ];

  myCoursesAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
  ];

  uploadedCoursesAuthors: string[] = [
    'James Young',
    'Elizabeth Wilson',
    'Thomas Baker',
    'Patricia Moore',
  ];

  rejectedCoursesAuthors: string[] = [
    'Daniel Clark',
    'Linda Taylor',
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

  myCoursesText: string[] = [
    'Expert | Detailed Course', 
    'Student | Crash Course', 
    'Beginner | Crash Course', 
    'Intermediate | Detailed Course',
  ];

  availableCoursesText: string[] = [
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
  randomRejectedValues:number[]=[];
  randomMyCourseValues: number[] = [];
  
  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  uploadSubscribers: string[] = [];
  myCourseSubscribers: string[] = [];
  availableCourseSubscribers: string[] = [];

  ngOnInit(): void {

    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
      this.uploadedimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomUploadValues.push(randomValue);
      const randomSubscribersIndex = Math.floor(Math.random() * this.subscribersValues.length);
      this.uploadSubscribers.push(this.subscribersValues[randomSubscribersIndex]);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.uploadedCoursesDurations.push(duration);
    }

    for (let j = 4; j < 6; j++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${j}`;
      this.rejectedimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomRejectedValues.push(randomValue);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);     
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.rejectedCoursesDurations.push(duration);
    }

    for (let k = 6; k < 10; k++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${k}`;
      this.mycoursesimages.push(randomImageURL);
      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomMyCourseValues.push(randomValue);
      const randomSubscribersIndex = Math.floor(Math.random() * this.subscribersValues.length);
      this.myCourseSubscribers.push(this.subscribersValues[randomSubscribersIndex]);

      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.myCoursesDurations.push(duration);
    }

    for (let l = 10; l < 22; l++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${l}`;
      this.availablecoursesimages.push(randomImageURL);
      const randomSubscribersIndex = Math.floor(Math.random() * this.subscribersValues.length);
      this.availableCourseSubscribers.push(this.subscribersValues[randomSubscribersIndex]);
      
      const minHours = 1.5;
      const maxHours = 6;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.availableCoursesDurations.push(duration);
    }
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}