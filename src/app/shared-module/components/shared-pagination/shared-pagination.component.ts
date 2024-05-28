import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../common/models/pagination.model';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-shared-pagination',
  templateUrl: './shared-pagination.component.html',
  styleUrls: ['./shared-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedPaginationComponent {

  // Total records count
  @Input()
  totalRecordsCount!: number;

  pageSizeOptions: Array<number> = [10, 20, 50];

  pagination: Pagination;

  constructor(private cdr: ChangeDetectorRef) {
    this.pagination = new Pagination();
  }

  // Response data
  @Output() pageChange = new EventEmitter<Pagination>();

  ngOnInit(): void {}

  // Manually trigger change detection when needed
  triggerChangeDetection() {
    this.cdr.detectChanges();
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.page = e.pageIndex;
    this.pagination.size = e.pageSize;
    this.pageChange.emit(this.pagination);
  }
}

