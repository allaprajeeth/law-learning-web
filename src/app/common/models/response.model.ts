import { Pagination } from "./pagination.model";

export class HttpResponse<T> {
    status!: number;
    records!: T[] ;
    pagination!: Pagination;
    constructor(json?: any) {
      if (json) {
        this.status = json.status;
        this.records = json.data ? (json.data.content ? json.data.content : [json.data]) : [];
        this.pagination = json.data.pageable as Pagination;
        if(json.data && this.pagination) {
          this.pagination.first = json.data.first;
          this.pagination.last = json.data.last;
          this.pagination.size = json.data.size;
          this.pagination.page = json.data.number;
          this.pagination.empty = json.data.empty;
          this.pagination.totalPages = json.data.totalPages;
          this.pagination.totalElements = json.data.totalElements;
        }
      }
    }
  }