export declare class HttpResponse {
    satus: number;
    data: {
        content: any[];
        pageable: Pagination
    };
    constructor(json: any);
  }

  export interface Pagination {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    offset: number;
  }