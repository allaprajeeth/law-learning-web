import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { endPoints } from 'src/app/common/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  
  // private apiUrl = 'http://localhost:8080/api/v1/secure/profile';
  private apiUrl = endPoints.baseURL + '/secure/profile';

  constructor(private http: HttpClient) {}

  updateProfile(formData: FormGroup) {
    return this.http.patch(this.apiUrl, formData.value);
  }
}
