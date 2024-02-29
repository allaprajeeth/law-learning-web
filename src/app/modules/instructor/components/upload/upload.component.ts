import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { CourseService } from 'src/app/common/services/course.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';

interface SubSection {
  id?: number;
  subFile: any;
  title: string;
  videoFile?: File;
  videoDuration: {
    minutes: number;
    seconds: number;
  };
  videoFileName: string;
  
  file?: File;
  description: string;
  submitted: boolean;
  status: string;
  duration: {
    minutes: number;
    seconds: number;
  };
  isSubSectionNameEntered: boolean;
  isVideoSelected: boolean;
  isSaveEnabled: boolean;
  isSubmitEnabled: boolean;
  buttonColor: string;
  expanded: boolean;
  isFormSubmitted: boolean;
}
interface MainSection {
  courseId: any;
  id?: number;
  duration: { minutes: number; seconds: number };
  name: string;
  title: string;
  file?: File;
  description: string;
  subSections: SubSection[];
  submitted: boolean;
  status: string;
  isNameEntered: boolean;
  isSaveEnabled: boolean;
  isSubmitEnabled: boolean;
  buttonColor: string;
  showAddSubSectionInput?: boolean; // Add this property
  newSubSectionTitle?: string; // Add this property
}

interface SubmittedCourse {
  data: {
    id: number;
    sections: MainSection[];
  };
  status: number;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements  OnInit, AfterViewInit {
  sections: any[] = [];
  uploadForm!: FormGroup;
  formData: FormData | undefined;
  courseId: string | null = null;
  sectionId: number | undefined;
  submittedCourse: SubmittedCourse | null = null;
  mainSections: MainSection[] = [];
  mainSectionForms: FormArray = this.fb.array([]);
  showForm: boolean = true;

  submitAllMessage: string | null = null;
  


  isNewSectionForm(): boolean {
    return this.mainSections.length === 0 || !this.mainSections[0].id;
  }

  addMainSection() {
    const newMainSection: MainSection = {
      title: '',
      subSections: [],
      submitted: false,
      courseId: undefined,
      duration: {
        minutes: 0,
        seconds: 0
      },
      name: '',
      description: '',
      status: '',
      isNameEntered: false,
      isSaveEnabled: false,
      isSubmitEnabled: false,
      buttonColor: ''
    };

    this.mainSections.push(newMainSection);
    this.mainSectionForms.push(this.createMainSectionForm(newMainSection));
    
    // Add this line to ensure that the form remains visible
    this.showForm = true;
  }
   mainSectionFormGroup(mainIndex: number): FormGroup {
    return this.mainSectionForms.at(mainIndex) as FormGroup;
  }

  addSubSection(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];
  
    if (mainSection) {
      const newSubSectionTitle = mainSection.newSubSectionTitle?.trim();
  
      if (newSubSectionTitle) {
        const newSubSection: SubSection = {
          title: newSubSectionTitle,
          description: '',
          submitted: false,
          status: '',
          duration: {
            minutes: 0,
            seconds: 0,
          },
          isSubSectionNameEntered: false,
          isVideoSelected: false,
          isSaveEnabled: false,
          isSubmitEnabled: false,
          buttonColor: '',
          expanded: false,
          isFormSubmitted: false,
          videoDuration: {
            minutes: 0,
            seconds: 0
          },
          videoFileName: '',
          subFile: undefined
        };
  
        mainSection.subSections.push(newSubSection);
        mainSection.showAddSubSectionInput = false;
  
        // Reset the newSubSectionTitle after adding a sub-section
        mainSection.newSubSectionTitle = '';
      }
    }
  }
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
      this.fetchSectionData();
      this.showForm = true;  
      this.addMainSection();
    });
    this.initializeForms();
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
      this.fetchSectionData();
      this.showForm = true;  
      this.addMainSection();

    
      this.cdr.detectChanges();
    });

    this.initializeForms();
  }

  
  initializeForms(): void {
    if (this.mainSections && this.mainSections.length > 0) {
      this.mainSections.forEach((section) => {
        this.mainSectionForms.push(this.createMainSectionForm(section));
      });
    }
  }
  
  toggleAddSubSection(mainIndex: number) {
    this.mainSections[mainIndex].showAddSubSectionInput = !this.mainSections[mainIndex].showAddSubSectionInput;
    if (this.mainSections[mainIndex].showAddSubSectionInput) {
      this.mainSections[mainIndex].newSubSectionTitle = '';
    }
  }

  submitSubSection(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];

    
    for (const subSection of mainSection.subSections) {
      if (this.courseId && mainSection.id && subSection.id) {
        const subSectionData = {
          title: subSection.title,
          description: subSection.description,
          videoFile: subSection.videoFile,
          subFile: subSection.subFile,
          minutes: subSection.duration.minutes,
          seconds: subSection.duration.seconds,
          submitted: true,
          status: 'Under Review',
        };

        this.courseService.patchSubSection<any>(this.courseId, mainSection.id, subSection.id, subSectionData)
          .subscribe(
            (response) => {
              console.log('Sub-section saved successfully:', response);
              
            },
            (error) => {
              console.error('Error saving sub-section:', error);
            }
          );
      } else {
        console.error('Course ID or Section ID is undefined');
      }
    }
  }

  
  
  createUploadForm() {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private createMainSectionForms() {
    this.mainSectionForms = this.fb.array(
      this.mainSections.map((mainSection) => this.createMainSectionForm(mainSection))
    );
  }
  createMainSectionForm(mainSection: MainSection): FormGroup {
    return this.fb.group({
      title: [mainSection.title, Validators.required],
      description: [mainSection.description, Validators.required],
      newSubSectionTitle: [''],
      SubSectiondescription:[''],
      videoFile: [''] ,
      subFile: [''] ,
      minutes: [0, Validators.required], 
    seconds: [0, Validators.required] 
      
    });
  }
  submitMainSection(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];
  
    if (this.courseId && mainSection.id) {
      const mainSectionData = new FormData();
      mainSectionData.append('title', mainSection.title);
      mainSectionData.append('description', mainSection.description);
  
      this.courseService.updateCourse(mainSection.id, mainSectionData)
        .subscribe(
          (response) => {
            console.log('Main section submitted and updated successfully:', response);
            mainSection.status = 'Under Review';
            mainSection.submitted = true;
          },
          (error) => {
            console.error('Error updating main section:', error);
          }
        );
    } else {
      console.error('Course ID or Section ID is undefined');
    }
  }
  
  

  private hasAnyMainSectionSubmitted(): boolean {
    return this.mainSections.some((mainSection) => mainSection.submitted);
  }

  fetchSectionData() {
    const apiUrl = `${endPoints.baseURL}/secure/courses/${this.courseId}`;

    this.http.get<SubmittedCourse>(apiUrl).subscribe(
      (response) => {
        this.mainSections = response.data.sections;
        this.loadUploadDetails();
        this.createMainSectionForms();
      },
      (error) => {
        console.error('Error fetching section:', error);
      }
    );
  }

  loadUploadDetails() {
    if (this.mainSections.length > 0) {
      const firstMainSection = this.mainSections[0];
      this.uploadForm.patchValue({
        title: firstMainSection.title,
        description: firstMainSection.description,
      });
    }
  }

  onMainSectionNameEntered(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];
    const newTitle = mainSection.title.trim();

    if (newTitle !== mainSection.name) {
      mainSection.name = newTitle;
      mainSection.isNameEntered = newTitle !== '';
      mainSection.isSubmitEnabled = mainSection.isNameEntered;
      mainSection.isSaveEnabled = mainSection.isNameEntered;
    }
  }

  onSubSectionNameEntered(mainIndex: number, subIndex: number) {
    const subSection = this.mainSections[mainIndex].subSections[subIndex];

    subSection.isSubSectionNameEntered = subSection.title.trim() !== '';

    subSection.isSaveEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
    subSection.isSubmitEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
  }

  hasSubmitEnabledSubSections(): boolean {
    for (const mainSection of this.mainSections) {
      for (const subSection of mainSection.subSections) {
        if (subSection.isSubmitEnabled) {
          return true;
        }
      }
    }
    return false;
  }
  goBack() {
   
  }

  toggleSubSection(mainIndex: number, subIndex: number) {
    this.mainSections[mainIndex].subSections[subIndex].expanded = !this.mainSections[mainIndex].subSections[subIndex].expanded;
  }

  onSubmit() {
    console.log('Form submitted!');
  }
  
submitSection(mainIndex: number) {
  const mainSection = this.mainSections[mainIndex];

  if (this.courseId) {
  } else {
    console.error('Course ID is undefined');
  }
}

  onVideoFileChange(event: any, mainIndex: number, subIndex: number) {
    console.log('Video file changed:', event.target.files);

    // we can access the selected file using event.target.files
    const selectedFile: File | null = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      
    }
  }
}










































































































// submitSubSection(mainIndex: number, subIndex: number) {
//   const subSection = this.mainSections[mainIndex].subSections[subIndex];

//   if (this.courseId && this.sectionId) {
//   } else {
//     console.error('Course ID or Section ID is undefined');
//   }

//   subSection.submitted = true;
//   subSection.status = 'Under Review';
//   subSection.isFormSubmitted = true;
//   subSection.expanded = false;

//   console.log('Sub-section submitted:', subSection);
// }

// submitSection(mainIndex: number) {
//   const mainSection = this.mainSections[mainIndex];

//   if (this.courseId) {
//   } else {
//     console.error('Course ID is undefined');
//   }
// }




































// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';
// import { endPoints } from 'src/app/common/constants/endpoints';
// import { CourseService } from 'src/app/common/services/course.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// interface SubSection {
//   title: string;
//   file?: File;
//   description: string;
//   submitted: boolean;
//   status: string;
//   duration: {
//     minutes: number;
//     seconds: number;
//   };
//   isSubSectionNameEntered: boolean;
//   isVideoSelected: boolean;
//   isSaveEnabled: boolean;
//   isSubmitEnabled: boolean;
//   buttonColor: string;
//   expanded: boolean;
//   isFormSubmitted: boolean;
// }

// interface MainSection {
//   courseId: any;
//   id?: number;
//   duration: { minutes: number; seconds: number };
//   name: string;
//   title: string;
//   file?: File;
//   description: string;
//   subSections: SubSection[];
//   submitted: boolean;
//   status: string;
//   isNameEntered: boolean;
//   isSaveEnabled: boolean;
//   isSubmitEnabled: boolean;
//   buttonColor: string;
// }

// interface SubmittedCourse {
//   data: {
//     id: number;
//     sections: MainSection[];
//   };
//   status: number;
// }

// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload.component.html',
//   styleUrls: ['./upload.component.scss'],
// })
// export class UploadComponent implements OnInit {
//   sections: any[] = [];



//   uploadForm!: FormGroup;
//   formData: FormData | undefined;
//   courseId: string | null = null;
//   sectionId: number | undefined;
//   submittedCourse: SubmittedCourse | null = null;

//   mainSections: MainSection[] = [];


  
//   // submittedCourse: SubmittedCourse | null = null;
//   submittedSections: MainSection[] = [];

//   // mainSections: MainSection[] = [];

//   isDurationFetched: boolean = false;
//   hasTest: string | null = null;
//   submitAllMessage: string | null = null;
//   anyMainSectionSubmitted: boolean = false;
//   allMainSectionsSubmitted: boolean = false;

//   isMainSectionSubmitEnabled: boolean = false;
//   isSubSectionSubmitEnabled: boolean = false;

//   isAddMainSectionButtonDisabled: boolean = true;
//   isMainSectionTitleEntered: boolean[] = [];
//   isAddSubSectionButtonDisabled: boolean[][] = [];

//   showForm: boolean = true;
//   // courseId: string | null = null;
//   // sectionId: number | undefined;

//   constructor(private fb: FormBuilder,private http: HttpClient, private route: ActivatedRoute, private courseService: CourseService)
//    {
//     this.uploadForm = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//     });

//     this.formData = new FormData();
//    }

//   ngOnInit() {
//      this.route.paramMap.subscribe((params) => {
//       this.courseId = params.get('courseId');
//       this.fetchSectionData();
    
//       this.addMainSection();
//       this.showForm = true;
//       this.isMainSectionTitleEntered[0] = false;
//     });
//   }

//   createUploadForm() {
//     this.uploadForm = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       // Add more form controls as needed
//     });
//   }

//   addMainSection() {
//     const newMainSection: MainSection = {
//       title: `Section ${this.mainSections.length + 1}`,
//       description: '',
//       subSections: [],
//       submitted: false,
//       status: '',
//       duration: {
//         minutes: 0,
//         seconds: 0,
//       },
//       isNameEntered: false,
//       isSaveEnabled: false,
//       isSubmitEnabled: false,
//       buttonColor: '',
//       courseId: undefined,
//       name: '',
//     };

//     this.isAddSubSectionButtonDisabled.push([true]); // Initialize as a nested array

//     const defaultSubSection: SubSection = {
//       title: `Sub-Section 1`,
//       description: '',
//       submitted: false,
//       status: '',
//       duration: {
//         minutes: 0,
//         seconds: 0,
//       },
//       isSubSectionNameEntered: false,
//       isVideoSelected: false,
//       isSubmitEnabled: false,
//       isSaveEnabled: false,
//       buttonColor: '',
//       expanded: false,
//       isFormSubmitted: false,
//     };

//     newMainSection.subSections.push(defaultSubSection);

//     this.mainSections.push(newMainSection);
//     this.isMainSectionSubmitEnabled = false;
//     this.isSubSectionSubmitEnabled = false;

//     this.isAddMainSectionButtonDisabled = true;
//   }

//   addSubSection(mainIndex: number) {
//     const newSubSection: SubSection = {
//       title: `Sub-Section ${mainIndex + 1}.${this.mainSections[mainIndex].subSections.length + 1}`,
//       description: '',
//       submitted: false,
//       status: '',
//       duration: {
//         minutes: 0,
//         seconds: 0,
//       },
//       isSubSectionNameEntered: false,
//       isVideoSelected: false,
//       isSubmitEnabled: false,
//       isSaveEnabled: false,
//       buttonColor: '',
//       expanded: false,
//       isFormSubmitted: false,
//     };

//     this.mainSections[mainIndex].subSections.push(newSubSection);
//     this.isAddSubSectionButtonDisabled[mainIndex].push(true); // Update the nested array
//   }

//   hasSubmitEnabledSubSectionsForMain(mainIndex: number): boolean {
//     return this.mainSections[mainIndex].subSections.some((subSection) => subSection.isSubmitEnabled);
//   }

//   removeMainSection(index: number) {
//     this.mainSections.splice(index, 1);
//     this.updateSectionNumbering();
//     this.anyMainSectionSubmitted = this.hasAnyMainSectionSubmitted();
//   }

//   removeSubSection(mainIndex: number, subIndex: number) {
//     this.mainSections[mainIndex].subSections.splice(subIndex, 1);
//     this.updateSectionNumbering();
//   }

//   private updateSectionNumbering() {
//     this.mainSections.forEach((mainSection, mainIndex) => {
//       mainSection.name = `Section ${mainIndex + 1}`;
//       mainSection.subSections.forEach((subSection, subIndex) => {
//         subSection.title = `Sub-Section ${mainIndex + 1}.${subIndex + 1}`;
//       });
//     });
//   }

//   onMainFileSelected(event: any, mainIndex: number, subIndex: number) {
//     const file = event.target.files[0];
//     if (file) {
//       const video = document.createElement('video');
//       video.src = URL.createObjectURL(file);
//       video.addEventListener('loadedmetadata', () => {
//         const duration = video.duration;
//         const minutes = Math.floor(duration / 60);
//         const seconds = Math.floor(duration % 60);
//         const subSection = this.mainSections[mainIndex].subSections[subIndex];

//         subSection.duration = {
//           minutes: minutes,
//           seconds: seconds,
//         };
//         subSection.isVideoSelected = true;

//         subSection.isSaveEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
//         subSection.isSubmitEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;

//         this.isDurationFetched = true;
//         URL.revokeObjectURL(video.src);
//       });
//     }
//   }

//   onSubFileSelected(event: any, mainIndex: number, subIndex: number) {
//     const file = event.target.files[0];
//     if (!file || !file.type.startsWith('video/')) {
//       window.alert('Error: Please select a valid video file.');
//       return;
//     }
//     this.mainSections[mainIndex].subSections[subIndex].file = file;
//   }

//   saveMainSection(mainIndex: number) {
//     const mainSection = this.mainSections[mainIndex];
//     mainSection.buttonColor = 'green';
//     console.log('Main section saved:', this.mainSections[mainIndex]);
//   }

//   submitMainSection(mainIndex: number) {
//     const mainSection = this.mainSections[mainIndex];

//     if (this.courseId) {
//       const apiUrl = `${endPoints.baseURL}/secure/courses/${this.courseId}/section/${mainSection.id}`;

//       const mainSectionData = {
//         title: mainSection.title,
//         description: mainSection.description,
//       };

//       this.http.patch(apiUrl, mainSectionData).subscribe(
//         (response) => {
//           console.log('Main section submitted and updated successfully:', response);
//           mainSection.status = 'Under Review';
//           mainSection.submitted = true;
//         },
//         (error) => {
//           console.error('Error updating main section:', error);
//         }
//       );
//     } else {
//       console.error('Course ID is undefined');
//     }

//     this.mainSections[mainIndex].submitted = true;
//     this.mainSections[mainIndex].status = 'Under Review';
//     this.anyMainSectionSubmitted = this.hasAnyMainSectionSubmitted();
//     this.isMainSectionSubmitEnabled = false;

//     this.isAddMainSectionButtonDisabled = false;

//     console.log('Main section submitted:', this.mainSections[mainIndex]);
//   }

//   private hasAnyMainSectionSubmitted(): boolean {
//     return this.mainSections.some((mainSection) => mainSection.submitted);
//   }

//   fetchSectionData() {
//     const apiUrl = `${endPoints.baseURL}/secure/courses/${this.courseId}/section`;
  
//     this.http.patch<SubmittedCourse>(apiUrl, {}).subscribe(
//       (response) => {
//         this.submittedCourse = response;
//         if (this.submittedCourse && this.submittedCourse.data) {
//           this.mainSections = this.submittedCourse.data.sections;
//         }
  
//         // Load existing data into the form
//         this.loadUploadDetails();
//       },
//       (error) => {
//         console.error('Error fetching section:', error);
//       }
//     );
//   }
  
  
//   loadUploadDetails() {
//     // Implement logic to load upload details into the form
//     // For example:
//     if (this.mainSections.length > 0) {
//       const firstMainSection = this.mainSections[0];
//       this.uploadForm.patchValue({
//         title: firstMainSection.title,
//         description: firstMainSection.description,
//         // Set more form control values as needed
//       });
//     }
//   }

//   submitSubSection(mainIndex: number, subIndex: number) {
//     const subSection = this.mainSections[mainIndex].subSections[subIndex];

//     if (this.courseId && this.sectionId) {
//       const apiUrl = `${endPoints.baseURL}/secure/courses/${this.courseId}/sections/${this.sectionId}/sub-sections`;

//       const subSectionData = {
//         title: subSection.title,
//         description: subSection.description,
//       };

//       this.http.patch(apiUrl, subSectionData).subscribe(
//         (response) => {
//           console.log('Sub-section submitted and updated successfully:', response);
//           subSection.status = 'Under Review';
//           subSection.submitted = true;
//         },
//         (error) => {
//           console.error('Error updating sub-section:', error);
//         }
//       );
//     } else {
//       console.error('Course ID or Section ID is undefined');
//     }

//     subSection.submitted = true;
//     subSection.status = 'Under Review';
//     subSection.isFormSubmitted = true;
//     this.isSubSectionSubmitEnabled = false;

//     this.isAddSubSectionButtonDisabled[mainIndex][subIndex] = false;
//     subSection.expanded = false;

//     console.log('Sub-section submitted:', subSection);
//   }

//   saveSubSection(mainIndex: number, subIndex: number) {
//     const subSection = this.mainSections[mainIndex].subSections[subIndex];

//     subSection.buttonColor = 'green';

//     console.log('Sub-section saved:', subSection);
//   }

//   get isCreateQuizButtonDisabled(): boolean {
//     return this.hasTest !== 'yes';
//   }

//   onMainSectionNameEntered(mainIndex: number) {
//     const mainSection = this.mainSections[mainIndex];
//     const newTitle = mainSection.title.trim();

//     if (newTitle !== mainSection.name) {
//       mainSection.name = newTitle;
//       mainSection.isNameEntered = newTitle !== '';
//       mainSection.isSubmitEnabled = mainSection.isNameEntered;
//       mainSection.isSaveEnabled = mainSection.isNameEntered;

//       this.isMainSectionTitleEntered[mainIndex] = mainSection.isNameEntered;
//     }
//   }

//   onSubSectionNameEntered(mainIndex: number, subIndex: number) {
//     const subSection = this.mainSections[mainIndex].subSections[subIndex];

//     subSection.isSubSectionNameEntered = subSection.title.trim() !== '';

//     subSection.isSaveEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
//     subSection.isSubmitEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
//   }

//   hasSubmitEnabledSubSections(): boolean {
//     for (const mainSection of this.mainSections) {
//       for (const subSection of mainSection.subSections) {
//         if (subSection.isSubmitEnabled) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }

//   submitSection(mainIndex: number) {
//     const mainSection = this.mainSections[mainIndex];

//     if (this.courseId) {
//       const apiUrl = `${endPoints.baseURL}/secure/courses/${this.courseId}/section/${mainSection.id}`;

//       const mainSectionData = {
//         title: mainSection.title,
//         description: mainSection.description,
//       };

//       this.http.patch(apiUrl, mainSectionData).subscribe(
//         (response) => {
//           console.log('Main section submitted and updated successfully:', response);
//           mainSection.status = 'Under Review';
//           mainSection.submitted = true;
//         },
//         (error) => {
//           console.error('Error updating main section:', error);
//         }
//       );
//     } else {
//       console.error('Course ID is undefined');
//     }
//   }


//   goBack() {
//     this.showForm = true;
//     this.submitAllMessage = null;
//   }

//   toggleSubSection(mainIndex: number, subIndex: number) {
//     this.mainSections[mainIndex].subSections[subIndex].expanded = !this.mainSections[mainIndex].subSections[subIndex].expanded;
//   }

//   onSubmit() {
//     // Handle form submission logic here
//     console.log('Form submitted!');
//   }

// }
