import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { SearchServiceService } from 'src/app/search.service.service';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {

mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];

  title = 'my-first-app';
  categories: Categories[] = [
    { viewValue: 'Beginner' },
    { viewValue: 'Intermediate' },
    { viewValue: 'Expert' },
    { viewValue: 'Student' },
  ];

  constructor(
    private route: ActivatedRoute,
    // private searchService: SearchServiceService
  ) {}

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

uploadedCoursesText: string[] = [
  'Expert | Detailed Course', 
  'Beginner | Crash Course', 
  'Intermediate | Detailed Course', 
  'Student | Crash Course',
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

  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];

  randomMyCourseValues: number[] = [];
  
  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  myCourseSubscribers: string[] = [];
  availableCourseSubscribers: string[] = [];
  ngOnInit(): void {
    // this.searchService.searchQuery$.subscribe((query) => {
    //   // this.searchQuery = query;
    //   this.filterImages();
    // });

    for (let i = 0; i < 4; i++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
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
      this.uploadedCoursesDurations.push(duration);
    }

    for (let l = 0; l < 12; l++) {
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