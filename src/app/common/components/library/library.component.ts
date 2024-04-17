import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { Pagination } from 'src/app/common/models/pagination.model';
import { HttpClient } from '@angular/common/http';
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
  selectedLibraryTitle:string | null = null;
  pdfSrc:string | undefined 
  role:string |undefined
  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private http: HttpClient,
    private authService: AuthTokenService,
    private dialog: MatDialog

   
  ) {
     const userDetails = this.authService.getUserDetails();
     this.isAdmin = userDetails?.role === 'ADMIN';
      this.role = userDetails?.role 
  }

  ngOnInit(): void {
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    this.libraries = this.libraryService.libraries;
  }

  openFile(library:any): void {
    let routePrefix = '';
    switch (this.role) {
      case 'SUBSCRIBER':
        routePrefix = `/subscriber/libraries`;
        break;
      case 'INSTRUCTOR':
        routePrefix = `/instructor/libraries`
        break;
      case 'ADMIN':
        routePrefix = `/admin/libraries`;
        break;
      case 'REVIEWER':
        routePrefix = `/reviewer/libraries`;
        break;
      case 'CONTENTMANAGER':
        routePrefix = `/authentication/libraries`;
        break;
      default:
        routePrefix = `/libraries`;
    }
    this.router.navigate([routePrefix, library.id]);

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
   
 
  loadMore() {
    this.apiLoading = true;
    this.pagination.page++;
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    this.apiLoading = false;
  }
 
}

