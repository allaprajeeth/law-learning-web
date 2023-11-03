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
}

interface MainSection {
  duration: { minutes: number; seconds: number; };
  name: string;
  file?: File;
  description: string;
  subSections: SubSection[];
  submitted: boolean;
  status: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  mainSections: MainSection[] = [];
  isDurationFetched: boolean = false;

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
      }
    };
    this.mainSections.push(newMainSection);
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
      }
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
        this.mainSections[mainIndex].subSections[subIndex].duration = {
          minutes: minutes,
          seconds: seconds
        };
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
    // Implement logic to save main section data
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
  
    // if (!subSection.file) {
    //   window.alert('Error: Please select a video file for this subsection.');
    //   return;
    // }
  
    // Implement logic to save sub-section data
    console.log('Sub-section saved:', subSection);
  }
}
