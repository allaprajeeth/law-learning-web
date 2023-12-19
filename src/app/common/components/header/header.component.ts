import { Component, OnInit } from '@angular/core';
import { COURSES_MOCK } from 'src/app/common/mocks/courses.mock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  filteredCourses: any[] = [];
  coursePrice: number[] = [];
  freeCoursesImages: string[] = [];
  paidCoursesimages: string[] = [];
  ratingValues: number[] = [];
  freeCoursesAuthors: string[] = [];
  freeCoursesHeadings: string[] = [];
  freeCoursesText: string[] = [];
  freeCoursesDurations: string[] = [];
  paidCoursesDurations: string[] = [];
  paidCoursesSubscribers: string[] = [];
  paidCoursesHeadings: string[] = [];
  paidCoursesAuthors: string[] = [];
  paidCoursesText: string[] = [];
  selectedCategory: string | null = null;
  selectedCourseType: string | null = null;
  paidCoursesType: string[] = [];
  paidCoursesLevel: string[] = [];

  title = 'my-first-app';

  uploadedCoursesDurations: string[] = [];

  numberofviews = ['11', '43', '64', '10', '55', '66'];

  subscribersValues = ['10', '50', '100', '200', '500', '1000'];

  private initializeFreeCoursesHeadings(): void {
    COURSES_MOCK.forEach((course) => {
      this.freeCoursesHeadings.push(course.courseTitle);
    });
    COURSES_MOCK.forEach((course) => {
      this.freeCoursesAuthors.push(course.courseInstructor);
    });
    COURSES_MOCK.forEach((course) => {
      this.freeCoursesText.push(`${course.courseLevel} | ${course.courseType}`);
    });
  }

  private initializePaidCoursesHeadings(): void {
    COURSES_MOCK.forEach((course) => {
      this.paidCoursesHeadings.push(course.courseTitle);
    });
    COURSES_MOCK.forEach((course) => {
      this.paidCoursesAuthors.push(course.courseInstructor);
    });
    COURSES_MOCK.forEach((course) => {
      this.paidCoursesText.push(`${course.courseLevel} | ${course.courseType}`);
    });
  }

  ngOnInit(): void {
    this.initializeFreeCoursesHeadings();
    this.initializePaidCoursesHeadings();

    for (let i = 0; i < 4; i++) {
      const randomCourse = COURSES_MOCK[i];
      const randomImageURL = `${randomCourse.courseThumbnail}?index=${i}`;
      this.freeCoursesImages.push(randomImageURL);

      const duration = `${randomCourse.courseDuration}`;
      this.freeCoursesDurations.push(duration);
    }

    for (let l = 0; l < 12; l++) {
      const randomCourse = COURSES_MOCK[l];
      const randomImageURL = `${randomCourse.courseThumbnail}?index=${l}`;
      this.paidCoursesimages.push(randomImageURL);

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
      this.paidCoursesSubscribers.push(
        this.subscribersValues[randomSubscribersIndex]
      );

      const duration = `${randomCourse.courseDuration}`;
      this.paidCoursesDurations.push(duration);

      this.paidCoursesType.push(randomCourse.courseType);
      this.paidCoursesLevel.push(randomCourse.courseLevel);
    }
  }
  updateSelectedCourseType(courseType: string): void {
    if (courseType === 'Clear All Filters') {
      this.selectedCategory = null;
      this.selectedCourseType = null;
      this.filteredCourses = [];
    } else {
      const [level, type] = courseType.split(' | ');
      this.selectedCourseType = null;
      if (level && type) {
        this.selectedCategory = level;
        this.selectedCourseType = type;
        this.filteredCourses = this.paidCoursesimages
          .map((image, index) => ({
            image,
            level: this.paidCoursesLevel[index],
            type: this.paidCoursesType[index],
            heading: this.paidCoursesHeadings[index],
            author: this.paidCoursesAuthors[index],
            text: this.paidCoursesText[index],
            duration: this.paidCoursesDurations[index],
            subscribers: this.paidCoursesSubscribers[index],
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
  }

  formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
