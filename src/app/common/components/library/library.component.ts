import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { Pagination } from 'src/app/common/models/pagination.model';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { endPoints } from '../../constants/endpoints';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent {
  libraries: Library[] = [];
  isAdmin: boolean = false;
  pagination: Pagination = new Pagination();
  apiLoading = false;
  selectedLibraryTitle: string | null = null;
  pdfSrc: string | undefined;
  role: string | undefined;
  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private http: HttpClient,
    private authService: AuthTokenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const userDetails = this.authService.getUserDetails();
    this.isAdmin = userDetails?.role === 'ADMIN';
    this.role = userDetails?.role;
  }

  ngOnInit(): void {
    // this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    // this.libraries = this.libraryService.libraries;
    // this.pagination = this.libraryService.pagination;
    this.getLibraries()
  }

  openFile(library: any): void {
    let routePrefix = '';
    switch (this.role) {
      case 'SUBSCRIBER':
        routePrefix = `/subscriber/libraries`;
        break;
      case 'INSTRUCTOR':
        routePrefix = `/instructor/libraries`;
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
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const baseUrl = endPoints.secureBaseURL;
        const apiUrl = baseUrl + `/libraries/${libraryId}`;

        this.http.delete(apiUrl).subscribe(
          () => {
            this.snackBar.open('Library deleted successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.libraries = this.libraries.filter(
              (library) => library.id !== libraryId
            );
          },
          (error) => {
            console.error('Error deleting library:', error);
          }
        );
      }
    });
  }

  onPageChange(pagination: Pagination) {
    this.pagination.page = pagination.page;
    this.pagination.size = pagination.size;
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getLibraries() {

    const apiUrl =endPoints.baseURL + `/libraries?page=${this.pagination.page}&size=${this.pagination.size}&sort=createdDate,desc`
    this.http
      .get<any>(apiUrl)
      .subscribe((response) => {
        const libraries:  Library[] = response.data.content;
        this.pagination = new Pagination(response.data);
        this.libraries = libraries;
      });
  }
}
