import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { HttpResponse } from 'src/app/common/models/response.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  libraries: Library[] = [];
  private pagination: Pagination = new Pagination();
  apiLoading = false;
  pdfSrc:string | undefined 
  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadLibraries(this.pagination.getPaginationRequest());
    // this.pdfSrc="assets/Java.pdf"
  }

  loadLibraries(params: any) {
    this.libraryService.get(params, endPoints.libraries).subscribe(
      (response: HttpResponse<Library>) => {
        for (const record of response.records) {
          // Add properties to control file content visibility and store file content
          record.showFileContent = false;
          record.fileContent = '';
          this.libraries.push(record);
        }
        this.pagination = new Pagination(response.pagination);
      }
    );
  }

  openFile(library: Library): void {
    this.pdfSrc = endPoints.s3BaseURL + library.url;
  
  }
  

  loadMore() {
    this.apiLoading = true;
    this.pagination.page++;
    this.loadLibraries(this.pagination.getPaginationRequest());
    this.apiLoading = false;
  }
  remainingPdfs(){
    this.pdfSrc=''
  }
}
