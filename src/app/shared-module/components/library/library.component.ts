import {  Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { HttpResponse } from 'src/app/common/models/response.model';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],

})
export class LibraryComponent {
  libraries: Library[] = [];
  private pagination: Pagination = new Pagination();
  apiLoading = false;
  constructor(private router:Router, private libraryService: LibraryService) {
  }
  
  ngOnInit(): void {
    this.loadLibraries(this.pagination.getPaginationRequest());
  }

  loadLibraries(params: any) {
    this.libraryService.get(params).subscribe((response: HttpResponse<Library>) => {
      for(var i in response.records){
        this.libraries.push(response.records[i]);
        this.pagination = new Pagination(response.pagination);
      }
    });
  }

  openFile(library: Library): void {
    this.router.navigate(['/pdf-viewer'], { queryParams: { src: library.url } });
  }

  loadMore() {
    this.apiLoading = true;
    this.pagination.page++;
    this.loadLibraries(this.pagination.getPaginationRequest());
    this.apiLoading = false;
  }
}
