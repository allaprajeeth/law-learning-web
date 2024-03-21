import { Component } from '@angular/core';
import { Library } from 'src/app/common/models/library.model';
import { LibraryService } from 'src/app/common/services/library/library.service';
import { Pagination } from 'src/app/common/models/pagination.model';

@Component({
  selector: 'app-library-history',
  templateUrl: './library-history.component.html',
  styleUrls: ['./library-history.component.scss']
})
export class LibraryHistoryComponent {
  private pagination: Pagination = new Pagination();
  libraries: Library[] = []; 

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.loadLibraries(this.pagination.getPaginationRequest()); 
    this.libraries = this.libraryService.libraries; 
  }
 

  
  
 
  


}
