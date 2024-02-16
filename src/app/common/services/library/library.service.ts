import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from '../../constants/endpoints';
import { Library } from '../../models/library.model';
import { BaseService } from '../base-service/base-service.service';
import { HttpResponse } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends BaseService<Library>{

  constructor(private http: HttpClient) {
    const baseUrl = endPoints.baseURL;
    super(http, HttpResponse<Library>, baseUrl);
  }
}
