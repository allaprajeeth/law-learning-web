import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/common/services/course.service';
import { endPoints } from 'src/app/common/api-layer/endpoints';
import { FormDataService } from 'src/app/common/services/form-data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private formDataService: FormDataService
  ) {
    this.uploadForm = this.fb.group({
      sectionTitle: ['', Validators.required],
      sectionDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Assuming that getCourseFormData returns an Observable
    this.formDataService.getCourseFormData().subscribe((courseFormData) => {
      // Handle courseFormData if needed
    });
  }

  onSubmitUploadForm() {
    // Retrieve course form data from local storage
    const courseFormDataString = localStorage.getItem('courseFormData');

    if (courseFormDataString) {
      const courseFormData = JSON.parse(courseFormDataString);
      console.log('Course Form Data:', courseFormData);

      const combinedFormData = new FormData();

      // Add course form data
      for (const [key, value] of Object.entries(courseFormData)) {
        combinedFormData.append(key, value as string | Blob);
      }

      // Add upload form data
      combinedFormData.append('sectionTitle', this.uploadForm.get('sectionTitle')!.value);
      combinedFormData.append('sectionDescription', this.uploadForm.get('sectionDescription')!.value);

      // Log the upload form data
      console.log('Upload Form Data:', this.uploadForm.value);

      console.log('Combined Form Data:', combinedFormData);

      this.courseService.post<any>('http://192.168.1.42:8080/api/v1/secure/courses', combinedFormData).subscribe(
        (response) => {
          console.log('Combined form data submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting combined form data:', error);
          console.error('Error status:', error.status);
          console.error('Error body:', error.error);
        }
      );
    } else {
      console.error('Course form data not found in local storage.');
    }
  }
}














// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
// }

// interface MainSection {
//   duration: { minutes: number; seconds: number };
//   name: string;
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

// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload.component.html',
//   styleUrls: ['./upload.component.scss'],
// })
// export class UploadComponent implements OnInit {
//   mainSections: MainSection[] = [];
//   isDurationFetched: boolean = false;
//   hasTest: string | null = null;
//   submitAllMessage: string | null = null;
//   anyMainSectionSubmitted: boolean = false; 
//   allMainSectionsSubmitted: boolean = false;

//   showForm: boolean = true;


//   constructor() {}

//   ngOnInit() {
//     this.addMainSection();
//     this.showForm = true; 
//   }

  
  
//   addMainSection() {
//     const newMainSection: MainSection = {
//       name: `Section ${this.mainSections.length + 1}`,
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
//     };
//     this.mainSections.push(newMainSection);
//     this.addSubSection(this.mainSections.length);
//   }

//   addSubSection(mainIndex: number) {
//     const newSubSection: SubSection = {
//       title: `Sub-Section ${mainIndex + 1}.${
//         this.mainSections[mainIndex].subSections.length + 1
//       }`,
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
//     };
//     this.mainSections[mainIndex].subSections.push(newSubSection);
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

        
//         subSection.isSaveEnabled =
//           subSection.isSubSectionNameEntered && subSection.isVideoSelected;
//         subSection.isSubmitEnabled =
//           subSection.isSubSectionNameEntered && subSection.isVideoSelected;

//         this.isDurationFetched = true;
//         URL.revokeObjectURL(video.src);
//       });
//       //document.body.appendChild(video);
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
//     this.mainSections[mainIndex].submitted = true;
//     this.mainSections[mainIndex].status = 'Under Review';
//     this.anyMainSectionSubmitted = this.hasAnyMainSectionSubmitted();
//     console.log('Main section submitted:', this.mainSections[mainIndex]);
//   }
//   private hasAnyMainSectionSubmitted(): boolean {
//     return this.mainSections.some(mainSection => mainSection.submitted);
//   }
 

//   submitSubSection(mainIndex: number, subIndex: number) {
//     this.mainSections[mainIndex].subSections[subIndex].submitted = true;
//     this.mainSections[mainIndex].subSections[subIndex].status = 'Under Review';
//     console.log(
//       'Sub-section submitted:',
//       this.mainSections[mainIndex].subSections[subIndex]
//     );
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
   
//     mainSection.isNameEntered = mainSection.name.trim() !== '';

//     mainSection.isSubmitEnabled = mainSection.isNameEntered;

//     mainSection.isSaveEnabled = mainSection.isNameEntered;

    
//   }
//   onSubSectionNameEntered(mainIndex: number, subIndex: number) {
//     const subSection = this.mainSections[mainIndex].subSections[subIndex];

//     subSection.isSubSectionNameEntered = subSection.title.trim() !== '';

    
//     subSection.isSaveEnabled =
//       subSection.isSubSectionNameEntered && subSection.isVideoSelected;
//     subSection.isSubmitEnabled =
//       subSection.isSubSectionNameEntered && subSection.isVideoSelected;
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

//   // submitSections() {
//   //   if (this.hasSubmitEnabledSubSections()) {
//   //     // Additional logic for handling successful submission
//   //     this.submitAllMessage = 'All sections submitted Successfully and Under Review.';
//   //   } else {
//   //     // If no submit-enabled subsections, you might want to handle it accordingly.
//   //     // For now, let's set a message for demonstration purposes.
//   //     this.submitAllMessage = 'No sections to submit or submission is not enabled for any section.';
//   //   }
//   // }
// // // In the component class
// // showForm: boolean = true;

// // ...

// submitSections() {
//   if (this.hasSubmitEnabledSubSections()) {

//     console.log('submitSections called');
//     // Additional logic for handling successful submission
//     this.submitAllMessage = 'All sections submitted Successfully and Under Review.';
//     // Hide the form and show the success message
//     this.showForm = false;
//   } else {
//     console.log('submitSections called');
//     // If no submit-enabled subsections, you might want to handle it accordingly.
//     // For now, let's set a message for demonstration purposes.
//     this.submitAllMessage = 'No sections to submit or submission is not enabled for any section.';
//   }
// }

// goBack() {
//   // Show the form again
//   this.showForm = true;
//   // Clear the success message
//   this.submitAllMessage = null;
// }

// }
