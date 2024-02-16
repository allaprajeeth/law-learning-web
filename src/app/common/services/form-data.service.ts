// form-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  courseFormData: any;
  uploadFormData: any;
  combinedFormData: any;

  setCourseFormData(data: any) {
    this.courseFormData = data;
    this.combineFormData();
  }

  setUploadFormData(data: any) {
    this.uploadFormData = data;
    this.combineFormData();
  }

  getCombinedFormData() {
    return this.combinedFormData;
  }

  private combineFormData() {
    this.combinedFormData = {
      ...this.courseFormData,
      ...this.uploadFormData
    };
  }
}
