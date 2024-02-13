import {  Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LibraryService } from './library.service';
import { Library } from 'src/app/common/models/library.model';
import { BaseModel } from 'src/app/common/models/base.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],

})
export class LibraryComponent {
  public libraries: Library[] = [];
  public apiLoading = false;
  constructor(private router:Router, private libraryService: LibraryService) {}
  
  ngOnInit(): void {
    let params: any = {number: 0, size: 20};
    this.loadLibraries(params);
  }

  loadLibraries(params: any) {
    this.libraryService.get(params).subscribe((libraries: Library[]) => {
      for(var i in libraries){
        this.libraries.push(libraries[i]);
      }
    });
  }

  openFile(library: Library): void {
    this.router.navigate(['/pdf-viewer'], { queryParams: { src: library.url } });
  }

  loadMore() {
    this.apiLoading = true;
    let params: any = {number: 0, size: 20};
    this.loadLibraries(params);
    this.apiLoading = false;
  }
}
