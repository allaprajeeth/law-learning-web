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

  @Input() currentPage: number = 1;
  // Total records count
  @Input() totalRecordsCount: number = 0;
  // Total pages
  totalPages: number = 0;

  constructor() {}

  // Response data
  @Output() pageChange = new EventEmitter<number>();

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.emitPageChange();
    }
  }

  emitPageChange() {
    this.pageChange.emit(this.currentPage);
  }

  getPageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i++);
  }
}

