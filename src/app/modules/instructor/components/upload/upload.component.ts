import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
}

interface MainSection {
  duration: { minutes: number; seconds: number; };
  name: string;
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
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  mainSections: MainSection[] = [];
  isDurationFetched: boolean = false;
  hasTest: string | null = null; 


  constructor() {}

  ngOnInit() {
    // Add the initial main section when the component initializes
    this.addMainSection();
  }
  addMainSection() {
    const newMainSection: MainSection = {
      name: `Section ${this.mainSections.length + 1}`,
      description: '',
      subSections: [],
      submitted: false,
      status: '',
      duration: {
        minutes: 0,
        seconds: 0
      },
      isNameEntered: false,
      isSaveEnabled: false,
      isSubmitEnabled: false,
      buttonColor: '',
    };
    this.mainSections.push(newMainSection);
  
    // Initialize isVideoSelected and isSaveAndSubmitEnabled for the new subsection
    this.addSubSection(this.mainSections.length );
  }
  

  addSubSection(mainIndex: number) {
    const newSubSection: SubSection = {
      title: `Sub-Section ${mainIndex + 1}.${this.mainSections[mainIndex].subSections.length + 1}`,
      description: '',
      submitted: false,
      status: '',
      duration: {
        minutes: 0,
        seconds: 0
      },
      isSubSectionNameEntered: false,
      isVideoSelected: false, 
      isSubmitEnabled: false,
      isSaveEnabled :false,
      buttonColor: '',
    };
    this.mainSections[mainIndex].subSections.push(newSubSection);
  }

  removeMainSection(index: number) {
    this.mainSections.splice(index, 1);
  }

  removeSubSection(mainIndex: number, subIndex: number) {
    this.mainSections[mainIndex].subSections.splice(subIndex, 1);
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
  
        // Update the duration and status of the subsection
        subSection.duration = {
          minutes: minutes,
          seconds: seconds
        };
        subSection.isVideoSelected = true; // Add this property to track video selection status
  
        // Check if both name and video are entered to enable the buttons
        subSection.isSaveEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
        subSection.isSubmitEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;

        this.isDurationFetched = true;
        URL.revokeObjectURL(video.src);
      });
      document.body.appendChild(video);
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

     // Update the flags to disable the "Save" button
  // mainSection.isSaveEnabled = 'green';

  // mainSection.isSaveEnabled = false;
  mainSection.buttonColor = 'green';
    
    console.log('Main section saved:', this.mainSections[mainIndex]);
  }

  submitMainSection(mainIndex: number) {
    this.mainSections[mainIndex].submitted = true;
    this.mainSections[mainIndex].status = 'Under Review';
    console.log('Main section submitted:', this.mainSections[mainIndex]);
  }

  submitSubSection(mainIndex: number, subIndex: number) {
    this.mainSections[mainIndex].subSections[subIndex].submitted = true;
    this.mainSections[mainIndex].subSections[subIndex].status = 'Under Review';
    console.log('Sub-section submitted:', this.mainSections[mainIndex].subSections[subIndex]);
  }

  submitSections() {
    // Implement logic to submit all sections data to your backend or storage system
    console.log('Submitted Data:', this.mainSections);
  }

  saveSubSection(mainIndex: number, subIndex: number) {
    const subSection = this.mainSections[mainIndex].subSections[subIndex];

    subSection.buttonColor = 'green';
  
    console.log('Sub-section saved:', subSection);
  }

  
  get isCreateQuizButtonDisabled(): boolean {
    return this.hasTest !== 'yes';
  }

  onMainSectionNameEntered(mainIndex: number){
    const mainSection = this.mainSections[mainIndex];
    // Check if the name of the section is entered
  mainSection.isNameEntered = mainSection.name.trim() !== '';
  // Check if both name and video are entered to enable the buttons
  // mainSection.isSaveAndSubmitEnabled = mainSection.isNameEntered;

  mainSection.isSubmitEnabled = mainSection.isNameEntered;

  mainSection.isSaveEnabled = mainSection.isNameEntered;


  // isSubmitEnabled: false ,
  //   isSaveEnabled :false,
  }
  onSubSectionNameEntered(mainIndex: number, subIndex: number) {
    const subSection = this.mainSections[mainIndex].subSections[subIndex];

    subSection.isSubSectionNameEntered = subSection.title.trim() !== '';

    // Check if both name and video are entered to enable the buttons
    subSection.isSaveEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
    subSection.isSubmitEnabled = subSection.isSubSectionNameEntered && subSection.isVideoSelected;
  }
  
   
}
