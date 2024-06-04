export class Pagination implements IPagination {
  totalPages!: number;
  offset!: number;
  last!: boolean;
  totalElements!: number;
  first!: boolean;
  size: number = 9;
  page: number = 0;
  empty!: boolean;

  constructor(json?: any) {
    if (json) {
      Object.assign(this, json);
    }
  }

  public getPaginationRequest(): any {
    return { page: this.page, size: this.size };
  }
}

export interface IPagination {
  totalPages?: number;
  offset?: number;
  last?: boolean;
  totalElements?: number;
  first?: boolean;
  size: number;
  page: number;
  empty?: boolean;
}
