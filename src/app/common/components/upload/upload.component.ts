import { Component, OnInit } from '@angular/core';

interface SubSection {
  title: string;
  file?: File;
  description: string;
  submitted: boolean;
  status: string;
}

interface MainSection {
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
      status: ''
    };
    this.mainSections.push(newMainSection);
  }

  removeMainSection(index: number) {
    this.mainSections.splice(index, 1);
  }

  addSubSection(mainIndex: number) {
    const newSubSection: SubSection = {
      title: `Sub-Section ${this.mainSections[mainIndex].subSections.length + 1}`,
      description: '',
      submitted: false,
      status: ''
    };
    this.mainSections[mainIndex].subSections.push(newSubSection);
  }

  removeSubSection(mainIndex: number, subIndex: number) {
    this.mainSections[mainIndex].subSections.splice(subIndex, 1);
  }

  onMainFileSelected(event: any, mainIndex: number) {
    const file = event.target.files[0];
    if (file) {
      this.mainSections[mainIndex].file = file;
    }
  }

  onSubFileSelected(event: any, mainIndex: number, subIndex: number) {
    const file = event.target.files[0];
    if (file) {
      this.mainSections[mainIndex].subSections[subIndex].file = file;
    }
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
    // Implement logic to save sub-section data
    
    console.log('Sub-section saved:', this.mainSections[mainIndex].subSections[subIndex]);
  }
}
