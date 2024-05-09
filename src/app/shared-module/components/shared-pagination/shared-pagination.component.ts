import { Pagination } from '../../../common/models/pagination.model';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-shared-pagination',
  templateUrl: './shared-pagination.component.html',
  styleUrls: ['./shared-pagination.component.scss']
})
export class SharedPaginationComponent {

  @Input() currentPage: number = 0;
  // Total records count
  @Input() totalRecordsCount: number = 0;
  // Total pages
  @Input()  totalPages: number = 0;

  constructor() {}

  // Response data
  @Output() pageChange = new EventEmitter<number>();

  ngOnInit(): void {
    
    
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  setPage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.emitPageChange();
    }
  }

  emitPageChange() {
    console.log(this.currentPage)
    
    this.pageChange.emit(this.currentPage);
    
  }

  getPageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i++);
  }
}

