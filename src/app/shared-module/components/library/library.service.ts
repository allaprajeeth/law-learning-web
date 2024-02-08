// articleform.service.ts
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Library } from 'src/app/common/models/library.model';
import { BaseService } from 'src/app/common/services/base-service/base-service.service';
import { endPoints } from 'src/app/common/api-layer/endpoints';

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends BaseService<Library>{

  constructor(private http: HttpClient) {
    const baseUrl = endPoints.baseURL + endPoints.libraries;
    super(http, Library, baseUrl);
  }
}
