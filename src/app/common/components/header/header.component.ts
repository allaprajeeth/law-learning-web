import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Categories {
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  availablecoursesimages: string[] = [];
  freecoursesimages:string[]=[]
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
   freeCoursesDurations:string[]=[]
  randomMyCourseValues: number[] = [];

  numberofviews = ["11", "43", "64", "10", "55", "66"]
  
  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  coursePrice = [
    3199, 3029, 3229, 3009, 3599, 3055, 3199, 3327, 3087, 3299, 3172, 3449,
  ];

  myCourseSubscribers: string[] = [];
  availableCourseSubscribers: string[] = [];
  ngOnInit(): void {
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
    for (let l = 13; l < 17; l++) {
      const randomImageURL = `https://picsum.photos/300/200?random=${l}`;
      this.freecoursesimages.push(randomImageURL);
      const minHours = 0.3;
      const maxHours = 0.5;
      const hours = minHours + Math.random() * (maxHours - minHours);     
      const formattedHours = Math.floor(hours);
      const minutes = Math.floor((hours % 1) * 60);
      const formattedMinutes = this.formatWithLeadingZero(minutes);    
      const duration = `${formattedHours}h ${formattedMinutes}m`;
      this.freeCoursesDurations.push(duration);
    }
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
  freeCoursesHeadings: string[] = [
    "Bankruptcy Law Intro",
    "Healthcare Law Benifits",
    "Immigration Law 101",
    "Estate Planning and Probate Law",
  ];
  
  freeCoursesAuthors: string[] = [
    'William Jackson',
    'Laura Roberts',
    'Richard Martin',
    'Lisa Miller',
  ];
  }
  

















  


  