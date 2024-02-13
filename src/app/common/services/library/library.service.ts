import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from '../../api-layer/endpoints';
import { Library } from '../../models/library.model';
import { BaseService } from '../base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends BaseService<Library>{

  constructor(private http: HttpClient) {
    const baseUrl = endPoints.baseURL + endPoints.libraries;
    super(http, Library, baseUrl);
  }
}
