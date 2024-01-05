import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterByCategoryService {

  constructor() { }

  filterByCategory(articles: any[], category: string): any[] {
    return articles.filter((article) => article.category === category);
  }
}
