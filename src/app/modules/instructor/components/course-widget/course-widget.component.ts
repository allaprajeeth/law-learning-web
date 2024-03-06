import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/models/course.model';
import { isNumber } from 'src/app/common/constants/utils';
import { endPoints } from 'src/app/common/constants/endpoints';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs/internal/Observable';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Section } from 'src/app/common/models/section.model';
import { CoursesService } from 'src/app/common/services/courses/courses.service';

@Component({
  selector: 'app-course-widget',
  templateUrl: './course-widget.component.html',
  styleUrls: ['./course-widget.component.scss']
})
export class CourseWidgetComponent {

  stepperOrientation: Observable<StepperOrientation>;

  // Couse form
  courseFormData: FormData;
  courseForm!: FormGroup;
  courseId: number | undefined;
  processing: boolean = false;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
    private courseService: CoursesService, private route: ActivatedRoute) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.courseFormData = new FormData();
  }

  ngOnInit() {
    // Create the course form when the component is initialized
    this.initCourseForm();
    this.courseId = this.route.snapshot.params['id'];
    if (this.courseId && isNumber(Number(this.courseId))) {
      this.loadCourseDetails(this.courseId);
    }
  }

  // Course form
  initCourseForm() {
    this.courseForm = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      type: ['', Validators.required],
      price: [null],
      language: ['English', Validators.required],
      courseFile: [null],
      sections: this._formBuilder.array([])
    });
  }

  // Sections form
  patchSectionForm(sections: Section[]) {
    this.clearSectionForm();
    sections.forEach(section => {
      var sectionForm: FormGroup = this.newSectionForm();
      sectionForm.patchValue(section);
      this.getSections.push(sectionForm);
    });
  }

  clearSectionForm() {
    this.getSections.clear();
  }

  get getSections(): FormArray {
    return this.courseForm.get('sections') as FormArray;
  }

  newSectionForm(): FormGroup {
    return this._formBuilder.group({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      subSections: this._formBuilder.array([])
    })
  }

  addSection() {
    this.getSections.push(this.newSectionForm());
  }

  removeSection(sectionIndex: number) {
    this.getSections.removeAt(sectionIndex);
  }

  // Sub Sections
  getSubSections(sectionIndex: number): FormArray {
    return this.getSections.at(sectionIndex).get("subSections") as FormArray
  }

  newSubSection(): FormGroup {
    return this._formBuilder.group({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  addSubSection(sectionIndex: number) {
    this.getSubSections(sectionIndex).push(this.newSubSection());
  }

  removeSubSection(sectionIndex: number, subSectionIndex: number) {
    this.getSubSections(sectionIndex).removeAt(subSectionIndex);
  }

  clearSubSectionForm(index: number) {
    this.getSubSections(index).clear();
  }

  private loadCourseDetails(courseId: number) {
    this.courseService.getById(endPoints.secure + endPoints.course + '/' + courseId).subscribe((courseDetails) => {
      const course: Course = courseDetails.records[0];
      this.courseForm.patchValue(course);
      if (course && course.sections) {
        this.patchSectionForm(course.sections);
      }
    });
  }

  onFileUpload(event: any) {
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      const file: File | null = files[0];
      if (file) {
        this.courseFormData.append('file', file);
      }
    }
  }

  onNext(stepper: MatStepper) {
    if (this.courseForm.valid) {
      this.courseFormData.set('course', new Blob([JSON.stringify(this.courseForm.value)], { type: 'application/json' }));
      if (this.courseId && isNumber(Number(this.courseId))) {
        //Update course record
        this.patchCourse(stepper);
        this.loadCourseDetails(this.courseId);
      } else {
        //Create course record
        this.postCourse(stepper);
        this.addSection();
      }
    } else {
      console.log(this.courseForm);
      console.log(this.courseForm.valid);
    }
  }

  onPrevious(stepper: MatStepper) {
    stepper.previous();
  }

  postCourse(stepper: MatStepper) {
    this.processing = true;
    this.courseService.post('/secure/courses', this.courseFormData).subscribe({
      next: (response: any) => {
        this.processing = false;
        if (response.status === 200) {
          this.courseId = response.records[0]?.id;
          stepper.next();
        } else {
          console.error('Error: Course id is undefined in the response.');
        }
      },error: (error: Error) => {
        console.error('Error creating course:', error);
        this.processing = false;
      }
    });
  }

  patchCourse(stepper: MatStepper) {
    this.courseService.patchWithAttachments('/secure/courses/' + this.courseId, this.courseFormData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.processing = false;
        stepper.next();
      },
      error: (error: Error) => {
        console.log(error);
        this.processing = false;
      }
    });
  }
}
