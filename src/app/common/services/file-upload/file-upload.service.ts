import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoints } from '../../constants/endpoints';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) { }
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
