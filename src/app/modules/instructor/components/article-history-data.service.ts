import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleHistoryDataService {
  private data: any = null;

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
