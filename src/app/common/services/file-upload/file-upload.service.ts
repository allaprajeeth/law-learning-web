import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoints } from '../../constants/endpoints';
import { FileInfo } from '../../models/fileInfo.model';
import { BaseService } from '../base-service/base-service.service';
import { HttpResponse } from '../../models/response.model';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService extends BaseService<FileInfo>{

    constructor(private http: HttpClient) { 
        const baseUrl = endPoints.baseURL;
        super(http, HttpResponse<FileInfo>, baseUrl);
    }
    upload(url: string, file: File, data?: any): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
        const req = new HttpRequest('POST', `${endPoints.secureBaseURL + url}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    getFiles(url: string): Observable<any> {
        return this.http.get(`${endPoints.secureBaseURL + url}`);
    }
}
