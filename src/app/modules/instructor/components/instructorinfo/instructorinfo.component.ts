import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { InstructorProfile } from 'src/app/common/models/instructor.model';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';
interface Categories {
  viewValue: string;
}


@Component({
  selector: 'app-instructorinfo',
  templateUrl: './instructorinfo.component.html',
  styleUrls: ['./instructorinfo.component.scss']
})
export class InstructorinfoComponent implements OnInit {
  description: string[] = [
    "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
    "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
    "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
    "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
    "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
  ];
  instructorRating = 4.7;
  coursePrice = [
    3199, 3029, 3229, 3009, 3599, 3055, 3199, 3327, 3087, 3299, 3172, 3449,
  ];


  
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
    private http: HttpClient ,
    private courseService: CourseService, private router:Router

  ) {  this.s3BaseURl = endPoints.s3BaseURL;}

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
    'john smith',
    'john smith',
    'john smith',
    'john smith',
  ];

uploadedCoursesText: string[] = [
  'Expert | Detailed Course', 
  'Beginner | Crash Course', 
  'Intermediate | Detailed Course', 
  'Student | Crash Course',
];


  uploadedCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];
  instructorReviewsbySubscriber='233';
  randomMyCourseValues: number[] = [];
  
  subscribersValues = ["10", "50", "100", "200", "500", "1000"];

  myCourseSubscribers: string[] = [];
  
  instructorId :number |undefined
  s3BaseURl: string;
 
  ngOnInit(): void {
   
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      this.instructorId = +params!;
      if (this.instructorId) {
        this.fetchInstructorProfiles(this.instructorId);
        this. fetchInstructorCourses()
      }
    });

   

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

  instructorProfiles: InstructorProfile[] = [];
  instructorCourses: Course[]=[]
  
  fetchInstructorProfiles(instructorIdToFetch?: number): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl = baseUrl + `/instructors/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
      
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (instructorIdToFetch) {
        this.instructorProfiles = response.data.content.filter((profile: { id: number; }) => profile.id === instructorIdToFetch);
      }
    });
  }

  fetchInstructorCourses(): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl = `${baseUrl}/instructor/${this.instructorId }/courses`;
    const params = new HttpParams()
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
      
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (this.instructorId ) {
        this.instructorCourses = response.data.content
        console.log(this.instructorCourses)
      }
    });
  }

  
  onImageError(event: any) {
    event.target.src = 'assets/law.png';
  }


}

