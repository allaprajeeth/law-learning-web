import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview-freecourse',
  templateUrl: './overview-freecourse.component.html',
  styleUrls: ['./overview-freecourse.component.scss']
})
export class OverviewFreecourseComponent implements OnChanges {
  @Input() course!: Course;

  instructor: any;
  instructorDetailsFetched: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && changes['course'].currentValue) {
      this.course = changes['course'].currentValue;
      this.fetchInstructorDetails(this.course.createdBy.id);
    }
  }

  fetchInstructorDetails(instructorId: number) {
    const url = `http://192.168.1.42:8080/api/v1/instructor/${instructorId}`;
    this.http.get(url).subscribe(
      (data) => {
        this.instructor = data;
        this.instructorDetailsFetched = true;
      },
      (error) => {
        console.error('Error fetching instructor details', error);
      }
    );
  }


  subscriberRatings = 4.5;
  reviewerRatings = 4;
  subscribersCount = "(1234)";
  reviewersCount = "(22)";
  instructorName = "Edward Viaene";
  instructorReviewsbySubscriber = "75332"
  instructorReviewsbyReviewer = '5'
  courseDuration = "2hr 3m";
  courseLastUpdated = "10/2023";
  courseDescription_1 = "From constitutional law, criminal law, and international law to environmental law, intellectual property law, and human rights law, there's a captivating world of legal knowledge to explore.";
  courseDescription_2 = "Delve into the intricacies of contract law and tort law, or immerse yourself in the evolving realms of cybersecurity law and technology law.";
  courseDescription_3 = "Whether you're interested in corporate law, family law, or pursuing a career in legal advocacy.";
  courseDescription_4 = "The realm of law learning is an exciting journey filled with boundless opportunities to gain a deeper understanding of justice.";
  courseDescription_5 = "Ethics, and the legal systems that shape our societies.";
  freeCourseSections = 15;
  freeCourseLectures = 45;
  freeCourseDuration = "3h 9m";
  freeCourseSectionsLectures = 3;
  freeCourseSectionsDuration = 5;
  freeCourseDescriptionText = "A course description provides an overview of what a course covers, while a syllabus provides specific details about the course, such as the schedule, grading criteria, assignments, textbook requirements, and policies";
  sectionInfoText = "Introduction to Law provides an overview of the law and the legal system.  This course covers the Constitution, court system attorney-client relationship, administrative law, crimes, torts, contract law, family law, owning and operating motor vehicles, renters and landlords, home ownership, employee and employer rights and duties, wills, trusts and probate laws and the Declaration of Independence.  The student will develop the knowledge and skills indicated by the Learning Outcomes for the course.";
  instructorDesignation = "Juris Doctor and Leading Law Learning Instructor";
  instructorRating = 4.7;
  instructorReviews = "715,505";
  instructorStudents = "2,342,416";
  instructorCourses = 7;
  instructorDescription = "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers. Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise. Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards. Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns. A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field.";




  showRatingOfCourse: boolean = false;
  showFreeCourse = true;

   constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.showRatingOfCourse = params['showRatingOfCourse'] === 'true';
      this.showFreeCourse = false;
    });
  }

  videoGroups: any[] = new Array(15).fill(null).map((_, i) => ({
    panelTitle: `Section ${i + 1}`,
    videos: [
      {
        url: 'assets/video2.mp4',
        selected: false,
        title: 'Introduction',
        time: '1min',
      },
      {
        url: 'assets/video3.mp4',
        selected: false,
        title: 'Hands-On Practice',
        time: '9min',
      },
      {
        url: 'assets/video1.mp4',
        selected: false,
        title: "Let's get started",
        time: '2min',
      },
    ],
  }));
  availableCourse: boolean = false;
  sectionInfo: boolean[][] = new Array(this.videoGroups.length)
    .fill([])
    .map(() => []);


  toggleSectionInfo(i: number, j: number) {
    this.sectionInfo[i][j] = !this.sectionInfo[i][j];
  }

  

  // instructor: {
  //   name: string;
  //   title: string;
  //   rating: number;
  //   bio: string;
  // } = {
  //     name: 'John Doe',
  //     title: 'Web Development Instructor',
  //     rating: 4.5,
  //     bio: 'John Doe is a web development instructor with over 10 years of experience. He has a passion for teaching and helping others learn new skills. John is also a certified web developer and has a strong understanding of HTML, CSS, and JavaScript.'
  //   };


  showPopup: boolean = false;

  submittedReview: boolean = false;
  showRating = false;

  stars = [1, 2, 3, 4, 5];
  selected = 0;
  isMore: boolean = false; // Set this to true to show the popup initially
  userReview: string = '';
  isratingEditable: boolean = true;
  
  leaveRatingOpen() {
    this.showRating = true;
  }
  leaveRatingClose() {
    this.showRating = false;
  }

  updaterating(r: any) {
    if (this.isratingEditable) {
      this.selected = r;
    }
  }
  submitRating() {
    console.log('Selected Rating:', this.selected);
    console.log('User Review:', this.userReview);
    this.isratingEditable = false;
    localStorage.setItem('userRating', this.selected.toString());

    this.showRating = false;
    this.submittedReview = true
  }

}
