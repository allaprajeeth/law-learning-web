import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
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
import { SubSection } from 'src/app/common/models/sub-sections.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from 'src/app/shared-module/components/confirmation-alert/confirmation-alert.component';
import { FileUploadService } from 'src/app/common/services/file-upload/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Quiz } from 'src/app/common/models/quiz.model';

@Component({
  selector: 'app-course-widget',
  templateUrl: './course-widget.component.html',
  styleUrls: ['./course-widget.component.scss'],
})
export class CourseWidgetComponent {
  stepperOrientation: Observable<StepperOrientation>;
  sectionStep: number = 0;
  subSectionStep: number = -1;
  // Couse form
  courseFormData: FormData;
  courseForm!: FormGroup;
  courseId: number;
  processing: boolean = false;
  course: Course = new Course();
  institutions: any[] = [];
  currentDocument: any; 
documentProgress: number | undefined; 


  

  // Resource upload
  currentFile?: File;
  progress: number = 0;

  showQuiz: boolean = false;
  thumbnail: any;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fileUploadService: FileUploadService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.courseFormData = new FormData();
    this.courseId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    // Create the course form when the component is initialized
    this.initCourseForm();
    this.loadInstitutions();
    if (this.courseId && isNumber(Number(this.courseId))) {
      this.loadCourseDetails(this.courseId);
    }
  }

  initCourseForm() {
    this.courseForm = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      institution: this._formBuilder.group({
        id: ['', Validators.required],
        name: [''],
      }),
      difficultyLevel: ['', Validators.required],
      type: ['', Validators.required],
      // price: [null],
      language: ['English', Validators.required],
      courseFile: [null],
      submitted: [false],
      sections: this._formBuilder.array([]),
    });
  }

  loadInstitutions() {
    this.courseService.getInstitutions().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.institutions = response.data;
          console.log('Institute data:', this.institutions);
        } else {
          console.error('Expected an array, but got:', response);
          this.institutions = [];
        }
      },
      (error) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }

  // Sections form
  patchSectionForm(sections: Section[]) {
    this.clearSectionForm();
    sections.forEach((section, index) => {
      var sectionForm: FormGroup = this.newSectionForm();
      sectionForm.patchValue(section);
      this.getSections.push(sectionForm);
      if (section && section.subSections) {
        this.patchSubSectionForm(index, section.subSections);
      }
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
      subSections: this._formBuilder.array([]),
    });
  }

  addSection() {
    this.getSections.push(this.newSectionForm());
  }

  removeSection(sectionIndex: number, id: number, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationAlertComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (id !== null && id.toString.length > 0) {
          this.deleteSection(id).subscribe({
            next: (response: any) => {
              if (response && response.status === 200)
                this.getSections.controls = this.getSections.controls.filter(
                  (elem, i) => i !== sectionIndex
                );
            },
            error: (error: Error) => {
              //TODO
            },
          });
        } else {
          this.getSections.controls = this.getSections.controls.filter(
            (elem, i) => i !== sectionIndex
          );
        }
      }
    });
  }

  // Sub Sections
  getSubSections(sectionIndex: number): FormArray {
    return this.getSections.at(sectionIndex).get('subSections') as FormArray;
  }

  newSubSectionForm(): FormGroup {
    return this._formBuilder.group({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  addSubSection(sectionIndex: number) {
    this.getSubSections(sectionIndex).push(this.newSubSectionForm());
  }

  patchSubSectionForm(sectionIndex: number, subSections: SubSection[]) {
    this.clearSubSectionForm(sectionIndex);
    subSections.forEach((subSection) => {
      var sectionForm: FormGroup = this.newSubSectionForm();
      sectionForm.patchValue(subSection);
      this.getSubSections(sectionIndex).push(sectionForm);
    });
  }

  removeSubSection(
    sectionIndex: number,
    subSectionIndex: number,
    sectionId: number,
    id: number,
    event: Event
  ) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationAlertComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (id !== null && id.toString.length > 0) {
          this.deleteSubSection(sectionId, id).subscribe({
            next: (response: any) => {
              if (response && response.status === 200)
                this.getSubSections(sectionIndex).controls =
                  this.getSubSections(sectionIndex).controls.filter(
                    (elem, i) => i !== subSectionIndex
                  );
            },
            error: (error: Error) => {
              //TODO
            },
          });
        } else {
          this.getSubSections(sectionIndex).controls = this.getSubSections(
            sectionIndex
          ).controls.filter((elem, i) => i !== subSectionIndex);
        }
      }
    });
  }

  clearSubSectionForm(index: number) {
    this.getSubSections(index).clear();
  }

  private loadCourseDetails(courseId: number) {
    this.courseService
      .getById(endPoints.secure + endPoints.course + '/' + courseId)
      .subscribe((courseDetails) => {
        this.course = courseDetails.records[0];
        if(this.course.thumbnail) {
          this.thumbnail = endPoints.s3BaseURL + this.course.thumbnail;
        }
        this.courseForm.patchValue(this.course);

        if (this.course && this.course.sections) {
          this.patchSectionForm(this.course.sections);
        }
      });
  }

  onFileUpload(event: any) {
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      const file: File | null = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.thumbnail = reader.result; // set image URL
        };
        reader.readAsDataURL(file);
        this.courseFormData.append('file', file);
      }
    }
  }

  onNext(stepper: MatStepper) {
    const selectedStepIndex = stepper.selectedIndex;
    if(selectedStepIndex === 1) {
      this.showQuiz = true;
      stepper.next();
    } else if (this.courseForm.valid) {
      this.courseFormData.set(
        'course',
        new Blob([JSON.stringify(this.courseForm.value)], {
          type: 'application/json',
        })
      );
      if (this.courseId && isNumber(Number(this.courseId))) {
        // Update course record
        this.patchCourse(stepper);
      } else {
        // Create course record
        console.log('From create course record');
        this.postCourse(stepper);
      }
    } else {
      console.log(this.courseForm);
      console.log(this.courseForm.valid);
    }
  }

  onPrevious(stepper: MatStepper) {
    if (this.courseId) this.loadCourseDetails(this.courseId);
    stepper.previous();
  }

  onSave() {
    if (this.courseForm.valid) {
      this.courseFormData.set(
        'course',
        new Blob([JSON.stringify(this.courseForm.value)], {
          type: 'application/json',
        })
      );
      if (this.courseId && isNumber(Number(this.courseId))) {
        //Update course record
        this.patchCourse();
      }
    }
  }

  postCourse(stepper?: MatStepper) {
    this.processing = true;
    this.courseService.post('/secure/courses', this.courseFormData).subscribe({
      next: (response: any) => {
        this.processing = false;
        if (response.status === 200) {
          this.courseId = response.records[0]?.id;
          if (stepper) stepper.next();
        } else {
          console.error('Error: Course id is undefined in the response.');
        }
      },
      error: (error: Error) => {
        console.error('Error creating course:', error);
        this.processing = false;
      },
    });
  }

  patchCourse(stepper?: MatStepper, submit?: boolean) {
    this.courseService
      .patchWithAttachments(
        '/secure/courses/' + this.courseId,
        this.courseFormData
      )
      .subscribe({
        next: (response: any) => {
          this.processing = false;
          if (stepper && response.status === 200) {
            this.course = response.records[0];
            stepper.next();
          } else if (response.status === 200 && this.courseId)
            this.loadCourseDetails(this.courseId);
        },
        error: (error: Error) => {
          this.processing = false;
        },
      });
  }

  deleteSection(id: number) {
    console.log(this.getSections);
    return this.courseService.delete(
      '/secure/courses/' + this.courseId + '/section/' + id
    );
  }

  deleteSubSection(sectionId: number, id: number) {
    return this.courseService.delete(
      '/secure/courses/' +
        this.courseId +
        '/section/' +
        sectionId +
        '/sub-section/' +
        id
    );
  }

  setStepExpansionPanel(index: number, key: string) {
    if (key === 'section') {
      this.sectionStep = index;
      this.subSectionStep = -1;
    }
    if (key === 'sub_section') this.subSectionStep = index;
  }

  onFileChanged(resourceType: string, event: any, subSection: SubSection) {
    const file = event.target.files;
    if (file && file.length > 0 && subSection) { // Add null check for subSection
      this.currentFile = file[0];
      if (resourceType === 'video') {
        // Check if this.currentFile is defined before accessing its properties
        if (this.currentFile) {
          subSection.videoFile = this.currentFile.name;
        }
      } else if (resourceType === 'document') {
        // Check if this.currentFile is defined before accessing its properties
        if (this.currentFile) {
          subSection.documentFile = this.currentFile.name;
        }
      }
    }
  }
  

  attachResource(
    resourceType: string,
    sectionId: number,
    subSectionId: number
  ) {
    if (this.currentFile) {
      const data = {
        resourceType: resourceType,
        name: this.currentFile.name,
        courseId: this.courseId,
        sectionId: sectionId,
        subSectionId: subSectionId,
      };
      this.fileUploadService
        .upload('/courses/upload', this.currentFile, data)
        .subscribe({
          next: (response: any) => {
            if (response.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(
                (100 * response.loaded) / response.total
              );
            } else if (response instanceof HttpResponse) {
              console.log(response.body.message);
            }
          },
          error: (error: Error) => {
            console.log(error);
            this.progress = 0;
          },
        });
    }
  }

  removeResource(sectionId: number, subSectionId: number, fileId: number) {
    let fileUploadBean = {
      id: fileId,
      courseId: this.course.id,
      sectionId: sectionId,
      subSectionId: subSectionId
    };
    this.fileUploadService
      .remove('/courses/upload/remove', fileUploadBean)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: Error) => {
          
        },
      });
  }

  editResource(arg0: number,arg1: number,arg2: number) {
    //TODO - Edit resorce.
  }

  // showFileUpload(subSection: SubSection) {
  //   return subSection && subSection.id && !subSection.file;
  // }

  showVideoUpload(subSection: SubSection): boolean {
    return !!subSection && !!subSection.id && !subSection.videoFile; 
  }
  
  
  showDocumentUpload(subSection: SubSection): boolean {
  return !!subSection && !!subSection.id; 
}

  

  isFileExists(subSection: SubSection) {
    return subSection && subSection.id && subSection.file;
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationAlertComponent, {
      data: {
        message: 'Are you sure want to submit the form for the review?',
        buttonText: {
          ok: 'Submit',
          cancel: 'Cancel',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (this.courseForm.valid) {
          this.courseForm.patchValue({
            submitted: true,
          });
          console.log(this.courseForm);
          console.log(this.courseForm.value);
          this.courseFormData.set(
            'course',
            new Blob([JSON.stringify(this.courseForm.value)], {
              type: 'application/json',
            })
          );
          if (this.courseId && isNumber(Number(this.courseId))) {
            this.patchCourse();
          }
          // Show snackbar message
          this.snackBar.open('Submitted successfully', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
          });
        }
      }
    });
  }
}
