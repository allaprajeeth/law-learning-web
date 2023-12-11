import { Component, OnInit } from '@angular/core';
import { COURSES_MOCK } from 'src/app/common/mocks/courses.mock';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  coursePrice: number[] = [];
  randomFutureDates: Date[] = [];
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];
  ratingValues: number[] = [];
  myCoursesAuthors: string[] = [];
  myCoursesHeadings: string[] = [];
  myCoursesText: string[] = [];
  myCoursesDurations: string[] = [];
  availableCoursesDurations: string[] = [];
  randomMyCourseValues: number[] = [];
  myCourseSubscribers: string[] = [];
  availableCourseSubscribers: string[] = [];
  availableCoursesHeadings: string[] = [];
  availableCoursesAuthors: string[] = [];
  availableCoursesText: string[] = [];
  selectedCategory: string | null = null;
  selectedCourseType: string | null = null;
  availableCoursesType: string[] = [];
  availableCoursesLevel: string[] = [];
  filteredCourses: any[] = [];

  subscribersValues = ['10', '30', '50', '100', '200', '500', '1000'];

  title = 'my-first-app';

  constructor() {
    this.randomFutureDates = this.generateRandomFutureDates(5);
  }

  private initializeMyCoursesHeadings(): void {
    COURSES_MOCK.forEach((course) => {
      this.myCoursesHeadings.push(course.courseTitle);
    });
    COURSES_MOCK.forEach((course) => {
      this.myCoursesAuthors.push(course.courseInstructor);
    });
    COURSES_MOCK.forEach((course) => {
      this.myCoursesText.push(`${course.courseLevel} | ${course.courseType}`);
    });
  }

  private initializeAvailableCoursesHeadings(): void {
    COURSES_MOCK.forEach((course) => {
      this.availableCoursesHeadings.push(course.courseTitle);
    });
    COURSES_MOCK.forEach((course) => {
      this.availableCoursesAuthors.push(course.courseInstructor);
    });
    COURSES_MOCK.forEach((course) => {
      this.availableCoursesText.push(
        `${course.courseLevel} | ${course.courseType}`
      );
    });
  }

  courseContent: string[] = [
    'Understanding the legal system and The role of law in society',
    'Types of crimes and Criminal procedure and evidence',
    'Tort law and Contract law and Legal dispute resolution',
    'Structure of government and Individual rights and liberties',
    'Finding and citing legal sources and Drafting legal documents',
    'Marriage and divorce and Child custody and support',
    'Property ownership and Real estate transactions',
    'Copyrights, trademarks, and patents and Protecting intellectual property',
    'Environmental regulations and Conservation and sustainability',
    'Employee rights and labor unions and Workplace discrimination and harassment',
    'Treaties and international organizations and Human rights and humanitarian law',
    'Regulations in the financial industry and Banking contracts and transactions',
  ];

  showCard: boolean[] = Array(12).fill(false);

  tooltipPosition: {
    left: string;
    right: string;
    top: string;
    display: string;
  } = { left: '0', right: 'unset', top: '0', display: 'none' };

  updateSelectedCourseType(courseType: string): void {
    const [level, type] = courseType.split(' | ');
    this.selectedCourseType = null;
    if (level && type) {
      this.selectedCategory = level;
      this.selectedCourseType = type;
      this.filteredCourses = this.availablecoursesimages
        .map((image, index) => ({
          image,
          level: this.availableCoursesLevel[index],
          type: this.availableCoursesType[index],
          heading: this.availableCoursesHeadings[index],
          author: this.availableCoursesAuthors[index],
          text: this.availableCoursesText[index],
          duration: this.availableCoursesDurations[index],
          subscribers: this.availableCourseSubscribers[index],
          price: this.coursePrice[index],
        }))
        .filter(
          (course) =>
            (!this.selectedCategory ||
              course.level === this.selectedCategory) &&
            (!this.selectedCourseType ||
              course.type === this.selectedCourseType)
        );
    } else {
      this.filteredCourses = [];
    }
  }

  openMyMenu(
    event: MouseEvent,
    index: number,
    isFiltered: boolean = false
  ): void {
    this.showCard = this.showCard.map((_, j) => j === index);

    if (this.showCard[index]) {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (rect.left + rect.width / 2 > window.innerWidth / 2) {
        this.tooltipPosition = {
          left: 'unset',
          right: `${window.innerWidth - rect.left}px`,
          top: `${rect.top}px`,
          display: 'block',
        };

        const courseCardPosition = { top: '-40px', right: '262px' };
        Object.assign(this.tooltipPosition, courseCardPosition);
      } else {
        this.tooltipPosition = {
          left: `${rect.left}px`,
          right: 'unset',
          top: `${rect.top}px`,
          display: 'block',
        };

        const courseCardPosition = { top: '-40px', left: '261px' };
        Object.assign(this.tooltipPosition, courseCardPosition);

        if (isFiltered) {
          this.filteredCourses[index].tooltipPosition = {
            ...this.tooltipPosition,
          };
        }
      }
    }
  }

  closeMyMenu(index: number): void {
    this.showCard[index] = false;
  }

  ngOnInit(): void {
    this.initializeMyCoursesHeadings();
    this.initializeAvailableCoursesHeadings();

    for (let i = 0; i < 4; i++) {
      const randomCourse = COURSES_MOCK[i];
      const randomImageURL = `${randomCourse.courseThumbnail}?index=${i}`;
      this.mycoursesimages.push(randomImageURL);

      const randomValue = Math.floor(Math.random() * 100) + 1;
      this.randomMyCourseValues.push(randomValue);

      const randomSubscribersIndex = Math.floor(
        Math.random() * this.subscribersValues.length
      );
      this.myCourseSubscribers.push(
        this.subscribersValues[randomSubscribersIndex]
      );

      const duration = `${randomCourse.courseDuration}`;
      this.myCoursesDurations.push(duration);
    }

    for (let l = 0; l < 12; l++) {
      const randomCourse = COURSES_MOCK[l];
      const randomImageURL = `${randomCourse.courseThumbnail}?index=${l}`;
      this.availablecoursesimages.push(randomImageURL);

      const randomPrices = `${randomCourse.coursePrice}`;
      this.coursePrice.push(parseInt(randomPrices, 10));

      const ratingValue = parseFloat(
        `${randomCourse.reviewerRating}?index=${l}`
      );

      const fullStars = Math.floor(ratingValue);
      const hasHalfStar = ratingValue % 1 !== 0;
      let starsHtml = '';

      for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
      }

      if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
      }

      this.ratingValues.push(ratingValue);

      const randomSubscribersIndex = Math.floor(
        Math.random() * this.subscribersValues.length
      );
      this.availableCourseSubscribers.push(
        this.subscribersValues[randomSubscribersIndex]
      );

      const duration = `${randomCourse.courseDuration}`;
      this.availableCoursesDurations.push(duration);

      this.availableCoursesType.push(randomCourse.courseType);
      this.availableCoursesLevel.push(randomCourse.courseLevel);
    }
  }

  getStarArray(ratingValue: number): number[] {
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;
    const starArray = Array(fullStars).fill(1);

    if (hasHalfStar) {
      starArray.push(0.5);
    }
    return starArray;
  }

  private generateRandomFutureDates(numDates: number): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < numDates; i++) {
      const randomMonthOffset = Math.floor(Math.random() * 4) + 1;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const randomDay = Math.floor(Math.random() * 28);
      currentDate.setMonth(currentMonth + randomMonthOffset);
      currentDate.setDate(randomDay);
      dates.push(currentDate);
    }
    return dates;
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
