import { Component } from '@angular/core';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { Pagination } from 'src/app/common/models/pagination.model';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-library-history',
  templateUrl: './library-history.component.html',
  styleUrls: ['./library-history.component.scss']
})
export class LibraryHistoryComponent {
 pagination: Pagination = new Pagination();
  libraries: Library[] = []; 

  constructor(
    private libraryService: LibraryService ,
    private http :HttpClient
  ) {}

  ngOnInit(): void {
    this.getLibraries()
  }
 
  getLibraries() {
    const paginationParams = this.pagination.getPaginationRequest();
    const queryParams = { ...paginationParams };
    const apiUrl = endPoints.baseURL + '/libraries';
    this.http
      .get<any>(apiUrl, { params: queryParams })
      .subscribe((response) => {
        const libraries:  Library[] = response.data.content;
        this.pagination = new Pagination(response.data);
        this.libraries = libraries;
      });
  }
  onPageChange(pagination: Pagination) {
    this.pagination.page  = pagination.page;
    this.pagination.size  = pagination.size;
    this.getLibraries()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
 
  


}
