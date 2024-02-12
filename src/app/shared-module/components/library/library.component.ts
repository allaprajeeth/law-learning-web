import {  Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LibraryService } from './library.service';
import { Library } from 'src/app/common/models/library.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],

})
export class LibraryComponent {
  public libraries: Library[] = [];
  constructor(private router:Router, private libraryService: LibraryService) {}
  
  ngOnInit(): void {
    this.loadLibraries();
  }

  loadLibraries() {
    this.libraryService.get().subscribe((libraries: Library[]) => { 
      this.libraries = libraries;
    });
  }

  openFile(library: Library): void {
    this.router.navigate(['/pdf-viewer'], { queryParams: { src: library.url } });
  }
}
