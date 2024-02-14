import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private readonly courseFormDataKey = 'courseFormData';

  setCourseFormData(formData: FormData) {
    const formDataString = JSON.stringify(formData);
    localStorage.setItem(this.courseFormDataKey, formDataString);
  }

  getCourseFormData(): Observable<string | null> {
    const formDataString = localStorage.getItem(this.courseFormDataKey);
    return of(formDataString);
  }
}
