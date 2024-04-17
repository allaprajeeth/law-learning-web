import { Component,  SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Library } from 'src/app/common/models/library.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';

@Component({
  selector: 'app-library-by-id',
  templateUrl: './library-by-id.component.html',
  styleUrls: ['./library-by-id.component.scss']
})
export class LibraryByIdComponent {
  libraries: Library[] = [];
  isAdmin: boolean = false;
  apiLoading = false;
  selectedLibraryTitle:string | null = null;
  pdfSrc:string | undefined 
  libraryData: any;
  role: string | undefined;
  constructor(
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthTokenService,
    private route: ActivatedRoute,

   
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      const libraryId= +params!;
      if (libraryId) {
        this.fetchLibrary(libraryId);
      }
    });
    const userDetails = this.authService.getUserDetails();
     this.role = userDetails?.role 
  }


  fetchLibrary(id: any) {
    const baseUrl = endPoints.baseURL;
    this.http.get<Library>(`${baseUrl}/libraries/${id}`).subscribe(
      (response) => {
        this.libraryData = response.data; 
        console.log(this.libraryData);
        this.pdfSrc = endPoints.s3BaseURL + this.libraryData?.url; 
        console.log(this.pdfSrc);
      },
      (error) => {
        console.error('Error fetching library:', error);
      }
    );
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
 
  remainingPdfs(){
      let routePrefix = '';
      switch (this.role) {
        case 'SUBSCRIBER':
          routePrefix = `/subscriber/library`;
          break;
        case 'INSTRUCTOR':
          routePrefix = `/instructor/library`
          break;
        case 'ADMIN':
          routePrefix = `/admin/library`;
          break;
        case 'REVIEWER':
          routePrefix = `/reviewer/library`;
          break;
        case 'CONTENTMANAGER':
          routePrefix = `/authentication/library`;
          break;
        default:
          routePrefix = `/library`;
      }
      this.router.navigate([routePrefix]);
  
    }
  }

