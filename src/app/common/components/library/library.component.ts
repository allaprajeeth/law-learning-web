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
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  libraries: Library[] = [];
  isAdmin: boolean = false;
  private pagination: Pagination = new Pagination();
  apiLoading = false;
  pdfSrc:string | undefined 
  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthTokenService,
    private dialog: MatDialog

   
  ) {
    // const userRole = localStorage.getItem('role');
     const userDetails = this.authService.getUserDetails();
    this.isAdmin = userDetails?.role === 'ADMIN';
  }

  ngOnInit(): void {
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    this.libraries = this.libraryService.libraries;
  }

 

  openFile(library: Library): void {
    this.pdfSrc = endPoints.s3BaseURL + library.url;
  
  }
 
  DeleteFile(libraryId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      // data: { fileId: libraryId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const apiUrl = `http://202.53.86.12:8080/api/v1/secure/libraries/${libraryId}`;
  
        this.http.delete(apiUrl).subscribe(
          () => {
            console.log('Library deleted successfully');
            this.libraries = this.libraries.filter(library => library.id !== libraryId);
          },
          (error) => {
            console.error('Error deleting library:', error);
          }
        );
      }
    });}
   
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

