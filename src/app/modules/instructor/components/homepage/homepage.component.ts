// homepage.component.ts

import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/common/services/course.service';
import { Course } from 'src/app/common/models/course.model';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  courses: Course[] = [];
  s3BaseURl: string;
  constructor(private courseService: CourseService, private router:Router) {
    this.s3BaseURl = endPoints.s3BaseURL;
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      (response: any) => {
        this.courses = response.data.content;
        console.log('Courses retrieved successfully:', this.courses);
        // console.log('Created courseId:', createdCourseId);
      },
      (error) => {
        console.error('Error retrieving courses:', error);
      }
    );
  }

  onEditCourse(courseId: number) {
   
    this.router.navigate(['/instructor/courses', courseId]);
    console.log('Editing course with ID:', courseId);
    
  }
}













// import { Component, OnInit } from '@angular/core';
// import { COURSES_MOCK } from 'src/app/common/mocks/courses.mock';
// import { CourseService } from 'src/app/common/services/course.service';


// @Component({
//   selector: 'app-unique-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.scss'],
// })
// export class HomepageComponent implements OnInit {
//   courseDetails: Course;

//   title = 'my-first-app';

//   coursesForSubmission: any[] = [];
//   coursesUnderReview: any[] = [];
//   approvedCourses: any[] = [];
//   commentedCourses: any[] = [];

//   uploadedimages: string[] = [];
//   rejectedimages: string[] = [];
//   approvedCoursesimages: string[] = [];
//   underreviewimages: string[] = [];

//   uploadedCoursesDurations: string[] = [];
//   rejectedCoursesDurations: string[] = [];
//   approvedCoursesDurations: string[] = [];
//   underreviewDurations: string[] = [];
//   approvedCoursesType: string[] = [];
//   approvedCoursesLevel: string[] = [];
//   coursePrice: number[] = [];
//   selectedCategory: string | null = null;
//   selectedCourseType: string | null = null;
//   filteredCourses: any[] = [];
//   approvedCoursesText: string[] = [];
//   approvedCoursesHeadings: string[] = [];
//   approvedCoursesAuthors: string[] = [];

//   underreviewHeadings: string[] = [
//     'Bankruptcy Law',
//     'Healthcare Law',
//     'Immigration Law 101',
//     'Estate Planning and Probate Law',
//   ];

//   uploadedCoursesHeadings: string[] = [
//     'Cybersecurity and Privacy Law',
//     'Tax Law Essentials',
//     'Criminal Procedure',
//     'Administrative Law',
//   ];

//   rejectedCoursesHeadings: string[] = [
//     'Business Law Essentials for Entrepreneurs',
//     'Torts and Personal Injury Law',
//   ];

//   underreviewAuthors: string[] = [
//     'William Jackson',
//     'Laura Roberts',
//     'Richard Martin',
//     'Lisa Miller',
//   ];

//   uploadedCoursesAuthors: string[] = [
//     'James Young',
//     'Elizabeth Wilson',
//     'Thomas Baker',
//     'Patricia Moore',
//   ];

//   rejectedCoursesAuthors: string[] = ['Daniel Clark', 'Linda Taylor'];

//   uploadedCoursesText: string[] = [
//     'Expert | Detailed Course',
//     'Beginner | Crash Course',
//     'Intermediate | Detailed Course',
//     'Student | Crash Course',
//   ];

//   rejectedCoursesText: string[] = [
//     'Intermediate | Detailed Course',
//     'Student | Crash Course',
//   ];

//   underreviewText: string[] = [
//     'Expert | Detailed Course',
//     'Student | Crash Course',
//     'Beginner | Crash Course',
//     'Intermediate | Detailed Course',
//   ];

//   randomUploadValues: number[] = [];
//   randomRejectedValues: number[] = [];
//   randomunderreviewValues: number[] = [];

//   subscribersValues = ['10', '50', '100', '200', '500', '1000'];

//   uploadSubscribers: string[] = [];
//   approvedCourseSubscribers: string[] = [];
//   underreviewSubscribers: string[] = [];

//   private initializeApprovedCoursesHeadings(): void {
//     COURSES_MOCK.forEach((course) => {
//       this.approvedCoursesHeadings.push(course.courseTitle);
//     });
//     COURSES_MOCK.forEach((course) => {
//       this.approvedCoursesAuthors.push(course.courseInstructor);
//     });
//     COURSES_MOCK.forEach((course) => {
//       this.approvedCoursesText.push(
//         `${course.courseLevel} | ${course.courseType}`
//       );
//     });
//   }

//   updateSelectedCourseType(courseType: string): void {
//     if (courseType === 'Clear Filters') {
//       this.selectedCategory = null;
//       this.selectedCourseType = null;
//       this.filteredCourses = [];
//     } else {
//       const [level, type] = courseType.split(' | ');
//       this.selectedCourseType = null;
//       if (level && type) {
//         this.selectedCategory = level;
//         this.selectedCourseType = type;
//         this.filteredCourses = this.approvedCoursesimages
//           .map((image, index) => ({
//             image,
//             level: this.approvedCoursesLevel[index],
//             type: this.approvedCoursesType[index],
//             heading: this.approvedCoursesHeadings[index],
//             author: this.approvedCoursesAuthors[index],
//             text: this.approvedCoursesText[index],
//             duration: this.approvedCoursesDurations[index],
//             subscribers: this.approvedCourseSubscribers[index],
//             price: this.coursePrice[index],
//           }))
//           .filter(
//             (course) =>
//               (!this.selectedCategory ||
//                 course.level === this.selectedCategory) &&
//               (!this.selectedCourseType ||
//                 course.type === this.selectedCourseType)
//           );
//       } else {
//         this.filteredCourses = [];
//       }
//     }
//   }

//   ngOnInit(): void {
//     this.initializeApprovedCoursesHeadings();
//     this.coursesForSubmission = this.generateCoursesData(
//       4,
//       this.uploadedimages,
//       this.randomUploadValues,
//       this.uploadSubscribers,
//       this.uploadedCoursesDurations
//     );

//     this.coursesUnderReview = this.generateCoursesData(
//       2,
//       this.underreviewimages,
//       this.randomunderreviewValues,
//       this.underreviewSubscribers,
//       this.underreviewDurations
//     );

//     this.commentedCourses = this.generateCoursesData(
//       2,
//       this.rejectedimages,
//       this.randomRejectedValues,
//       [],
//       this.rejectedCoursesDurations
//     );

//     for (let l = 0; l < 12; l++) {
//       const randomCourse = COURSES_MOCK[l];
//       const randomImageURL = `${randomCourse.courseThumbnail}?index=${l}`;
//       this.approvedCoursesimages.push(randomImageURL);

//       const randomPrices = `${randomCourse.coursePrice}`;
//       this.coursePrice.push(parseInt(randomPrices, 10));

//       const randomSubscribersIndex = Math.floor(
//         Math.random() * this.subscribersValues.length
//       );
//       this.approvedCourseSubscribers.push(
//         this.subscribersValues[randomSubscribersIndex]
//       );

//       const duration = `${randomCourse.courseDuration}`;
//       this.approvedCoursesDurations.push(duration);

//       this.approvedCoursesType.push(randomCourse.courseType);
//       this.approvedCoursesLevel.push(randomCourse.courseLevel);
//     }
//   }

//   generateCoursesData(
//     count: number,
//     images: string[],
//     randomValues: number[],
//     subscribers: string[],
//     durations: string[]
//   ): any[] {
//     const courses: any[] = [];

//     for (let i = 0; i < count; i++) {
//       const randomImageURL = `https://picsum.photos/300/200?random=${i}`;
//       images.push(randomImageURL);
//       const randomValue = Math.floor(Math.random() * 100) + 1;
//       randomValues.push(randomValue);

//       if (subscribers.length > 0) {
//         const randomSubscribersIndex = Math.floor(
//           Math.random() * this.subscribersValues.length
//         );
//         subscribers.push(this.subscribersValues[randomSubscribersIndex]);
//       }

//       const minHours = 1.5;
//       const maxHours = 6;
//       const hours = minHours + Math.random() * (maxHours - minHours);
//       const formattedHours = Math.floor(hours);
//       const minutes = Math.floor((hours % 1) * 60);
//       const formattedMinutes = this.formatWithLeadingZero(minutes);
//       const duration = `${formattedHours}h ${formattedMinutes}m`;
//       durations.push(duration);

//       courses.push({
//         // Add other properties as needed based on your actual data structure
//         title: `Course ${i + 1}`,
//         // ...
//       });
//     }

//     return courses;
//   }

//   formatWithLeadingZero(value: number): string {
//     return value < 10 ? `0${value}` : `${value}`;
//   }
// }
