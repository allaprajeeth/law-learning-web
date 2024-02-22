import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';

interface SubSection {
  title: string;
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
  title: string;  // Add this line
  file?: File;
  description: string;
  
  subSections: SubSection[];
  submitted: boolean;
  status: string;
  isNameEntered: boolean;
  isSaveEnabled: boolean;
  isSubmitEnabled: boolean;
  buttonColor: string;
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  mainSections: MainSection[] = [];

  isDurationFetched: boolean = false;
  hasTest: string | null = null;
  submitAllMessage: string | null = null;
  anyMainSectionSubmitted: boolean = false; 
  allMainSectionsSubmitted: boolean = false;

  isMainSectionSubmitEnabled: boolean = false;
  isSubSectionSubmitEnabled: boolean = false;

  

  // Add these properties to your component class
isAddMainSectionButtonDisabled: boolean = true;
// isAddSubSectionButtonDisabled: boolean = true;
isMainSectionTitleEntered: boolean[] = [];

isAddSubSectionButtonDisabled: boolean[] = [];




  showForm: boolean = true;
  courseId: string | null = null;


  constructor(private http: HttpClient,private route: ActivatedRoute) {
    this.isAddSubSectionButtonDisabled = new Array(this.mainSections.length).fill(false);
  }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('Route Params:', params.keys, params);
      this.courseId = params.get('courseId');
      console.log('Course ID:', this.courseId);
  
      // Move addMainSection inside the subscribe block
      this.addMainSection();
      this.showForm = true;
      this.isMainSectionTitleEntered[0] = false;
    });
  
    console.log('Initial Course ID:', this.courseId);
  }
  
  

  
  // ...

addMainSection() {
  const newMainSection: MainSection = {
    title: `Section ${this.mainSections.length + 1}`,
    description: '',
    subSections: [],
    submitted: false,
    status: '',
    duration: {
      minutes: 0,
      seconds: 0,
    },
    isNameEntered: false,
    isSaveEnabled: false,
    isSubmitEnabled: false,
    buttonColor: '',
    courseId: undefined,
    name: ''
  };

  // Initialize isAddSubSectionButtonDisabled to true for the new main section
  this.isAddSubSectionButtonDisabled.push(true);

  // Add one default sub-section
  const defaultSubSection: SubSection = {
    title: `Sub-Section 1`,
    description: '',
    submitted: false,
    status: '',
    duration: {
      minutes: 0,
      seconds: 0,
    },
    isSubSectionNameEntered: false,
    isVideoSelected: false,
    isSubmitEnabled: false,
    isSaveEnabled: false,
    buttonColor: '',
    expanded: false,
    isFormSubmitted: false,
  };

  newMainSection.subSections.push(defaultSubSection);

  this.mainSections.push(newMainSection);
  this.isMainSectionSubmitEnabled = false;
  this.isSubSectionSubmitEnabled = false;
  

  // Enable the "Add Sub Section" button for the first main section
  // this.isAddSubSectionButtonDisabled = [!this.isMainSectionTitleEntered];

  // Disable the "Add Main Section" button
  this.isAddMainSectionButtonDisabled = true;
}

// ...

    

    addSubSection(mainIndex: number) {
      const newSubSection: SubSection = {
        title: `Sub-Section ${mainIndex + 1}.${this.mainSections[mainIndex].subSections.length + 1}`,
        description: '',
        submitted: false,
        status: '',
        duration: {
          minutes: 0,
          seconds: 0,
        },
        isSubSectionNameEntered: false,
        isVideoSelected: false,
        isSubmitEnabled: false,
        isSaveEnabled: false,
        buttonColor: '',
        expanded: false,
        isFormSubmitted: false,
      };
    
      this.mainSections[mainIndex].subSections.push(newSubSection);
    
     // Enable the "Add Sub Section" button after adding a subsection
    // Disable the "Add Sub Section" button after clicking it
  this.isAddSubSectionButtonDisabled[mainIndex] = true;
}

hasSubmitEnabledSubSectionsForMain(mainIndex: number): boolean {
  return this.mainSections[mainIndex].subSections.some(subSection => subSection.isSubmitEnabled);
}


  removeMainSection(index: number) {
    this.mainSections.splice(index, 1);
    this.updateSectionNumbering();
    this.anyMainSectionSubmitted = this.hasAnyMainSectionSubmitted(); 
  }

  removeSubSection(mainIndex: number, subIndex: number) {
    this.mainSections[mainIndex].subSections.splice(subIndex, 1);
    this.updateSectionNumbering();
  }

  private updateSectionNumbering() {
    this.mainSections.forEach((mainSection, mainIndex) => {
      mainSection.name = `Section ${mainIndex + 1}`;
      mainSection.subSections.forEach((subSection, subIndex) => {
        subSection.title = `Sub-Section ${mainIndex + 1}.${subIndex + 1}`;
      });
    });
  }
  

  onMainFileSelected(event: any, mainIndex: number, subIndex: number) {
    const file = event.target.files[0];
    if (file) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.addEventListener('loadedmetadata', () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const subSection = this.mainSections[mainIndex].subSections[subIndex];

       
        subSection.duration = {
          minutes: minutes,
          seconds: seconds,
        };
        subSection.isVideoSelected = true; 

        
        subSection.isSaveEnabled =
          subSection.isSubSectionNameEntered && subSection.isVideoSelected;
        subSection.isSubmitEnabled =
          subSection.isSubSectionNameEntered && subSection.isVideoSelected;

        this.isDurationFetched = true;
        URL.revokeObjectURL(video.src);
      });
      //document.body.appendChild(video);
    }
  }
  onSubFileSelected(event: any, mainIndex: number, subIndex: number) {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('video/')) {
      window.alert('Error: Please select a valid video file.');
      return;
    }
    this.mainSections[mainIndex].subSections[subIndex].file = file;
  }

  saveMainSection(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];
    mainSection.buttonColor = 'green';
    console.log('Main section saved:', this.mainSections[mainIndex]);
  }

  
  submitMainSection(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];

    if (this.courseId) {
      const apiUrl = `http://192.168.1.42:8080/api/v1/secure/courses/${this.courseId}/section`;

      const mainSectionData = {
        title: mainSection.title,
        description: mainSection.description,
        course_id: this.courseId  
      };

      
      this.http.patch(apiUrl, mainSectionData).subscribe(
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
      console.error('Course ID is undefined');
    }

    this.mainSections[mainIndex].submitted = true;
    this.mainSections[mainIndex].status = 'Under Review';
    this.anyMainSectionSubmitted = this.hasAnyMainSectionSubmitted();
    this.isMainSectionSubmitEnabled = false;

    

    // Enable the "Add Main Section" button
  this.isAddMainSectionButtonDisabled = false;


    console.log('Main section submitted:', this.mainSections[mainIndex]);
  }
  
  
  private hasAnyMainSectionSubmitted(): boolean {
    return this.mainSections.some(mainSection => mainSection.submitted);
  }


  submitSubSection(courseId: string, mainIndex: number, subIndex: number) {
    const subSection = this.mainSections[mainIndex].subSections[subIndex];
  
    if (courseId) {
      const apiUrl = `${endPoints.baseURL}/secure/courses/${courseId}/section/${this.mainSections[mainIndex].id}/sub-section`;
  
      const subSectionData = {
        title: subSection.title,
        description: subSection.description,
        // Add other properties as needed
      };
  
      this.http.patch(apiUrl, subSectionData).subscribe(
        (response) => {
          console.log('Sub-section submitted and updated successfully:', response);
          subSection.status = 'Under Review';
          subSection.submitted = true;
        },
        (error) => {
          console.error('Error updating sub-section:', error);
        }
      );
    } else {
      console.error('Course ID is undefined');
    }
  
    subSection.submitted = true;
    subSection.status = 'Under Review';
    subSection.isFormSubmitted = true; // Set the property to true
    this.isSubSectionSubmitEnabled = false;
  
    // Disable the "Add Sub Section" button after submitting the subsection
    this.isAddSubSectionButtonDisabled[mainIndex] = false;
  
    // Add logic to hide the form after submission
    subSection.expanded = false;
  
    console.log('Sub-section submitted:', subSection);
  }
  
 
  // submitSubSection(courseId: string, sectionId: number,subIndex: number) {
  //   // const subSection = this.mainSections[mainIndex].subSections[subIndex];
  //   const subSection = this.mainSections[sectionId].subSections[subIndex];

  //   if (courseId) {
  //     const apiUrl = `${endPoints.baseURL}/secure/courses/${courseId}/section/${sectionId}/sub-section`;
  
  //     const subSectionData = {
  //       title: subSection.title,
  //       description: subSection.description,
  //       course_id: this.courseId,
  //       // section-id: this.sectionId  
  //     };

  //     this.http.patch(apiUrl, subSectionData).subscribe(
  //       (response) => {
  //         console.log('Sub-section submitted and updated successfully:', response);
  //         subSection.status = 'Under Review';
  //         subSection.submitted = true;
  //       },
  //       (error) => {
  //         console.error('Error updating sub-section:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Course ID is undefined');
  //   }

  
  //   subSection.submitted = true;
  //   subSection.status = 'Under Review';
  //   subSection.isFormSubmitted = true; // Set the property to true
  
  //   this.isSubSectionSubmitEnabled = false;
  
  //   // Disable the "Add Sub Section" button after submitting the subsection
  //   this.isAddSubSectionButtonDisabled[sectionId] = false;
  
  //   // Add logic to hide the form after submission
  //   subSection.expanded = false;
  
  //   console.log('Sub-section submitted:', subSection);
  // }
  

  saveSubSection(mainIndex: number, subIndex: number) {
    const subSection = this.mainSections[mainIndex].subSections[subIndex];

    subSection.buttonColor = 'green';

    console.log('Sub-section saved:', subSection);
  }

  get isCreateQuizButtonDisabled(): boolean {
    return this.hasTest !== 'yes';
  }

  onMainSectionNameEntered(mainIndex: number) {
    const mainSection = this.mainSections[mainIndex];
    const newTitle = mainSection.title.trim();
    
    if (newTitle !== mainSection.name) {
      mainSection.name = newTitle;
      mainSection.isNameEntered = newTitle !== '';
      mainSection.isSubmitEnabled = mainSection.isNameEntered;
      mainSection.isSaveEnabled = mainSection.isNameEntered;
    
      // console.log('Main Section Title:', mainSection.name);

      // Enable the "Add Sub Section" button when the title is entered
    this.isMainSectionTitleEntered[mainIndex] = mainSection.isNameEntered;
    }
  }
  
  
  
  onSubSectionNameEntered(mainIndex: number, subIndex: number) {
    const subSection = this.mainSections[mainIndex].subSections[subIndex];

    subSection.isSubSectionNameEntered = subSection.title.trim() !== '';

    
    subSection.isSaveEnabled =
      subSection.isSubSectionNameEntered && subSection.isVideoSelected;
    subSection.isSubmitEnabled =
      subSection.isSubSectionNameEntered && subSection.isVideoSelected;
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

submitSections() {
  if (this.hasSubmitEnabledSubSections()) {

    console.log('submitSections called');
    // Additional logic for handling successful submission
    this.submitAllMessage = 'All sections submitted Successfully and Under Review.';
    // Hide the form and show the success message
    this.showForm = false;
  } else {
    console.log('submitSections called');
    // If no submit-enabled subsections, you might want to handle it accordingly.
    // For now, let's set a message for demonstration purposes.
    this.submitAllMessage = 'No sections to submit or submission is not enabled for any section.';
  }
}

goBack() {
  // Show the form again
  this.showForm = true;
  // Clear the success message
  this.submitAllMessage = null;
}

toggleSubSection(mainIndex: number, subIndex: number) {
  this.mainSections[mainIndex].subSections[subIndex].expanded = !this.mainSections[mainIndex].subSections[subIndex].expanded;
}


}