import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { HttpResponse } from 'src/app/common/models/response.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  libraries: Library[] = [];
  private pagination: Pagination = new Pagination();
  apiLoading = false;
  pdfSrc:string | undefined 
  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    this.libraries = this.libraryService.libraries;
  }

 

  openFile(library: Library): void {
    this.pdfSrc = endPoints.s3BaseURL + library.url;
  
  }
  
  downloadPdf(): void {
    if (this.pdfSrc) {
      // Use Angular's DomSanitizer to sanitize the URL
      const sanitizedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

      // Extract the URL from SafeResourceUrl
      const url = this.sanitizer.sanitize(SecurityContext.URL, sanitizedUrl as string) || '';

      // Trigger the download using the FileSaver library
      saveAs(url, 'downloaded_pdf.pdf');
    }
  }
  loadMore() {
    this.apiLoading = true;
    this.pagination.page++;
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    this.apiLoading = false;
  }
  remainingPdfs(){
    this.pdfSrc=''
  }
}

