import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userName: string = '';
  private selectedCategory: string = 'all';

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }
  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  getCategory(): string {
    return this.selectedCategory;
  }
  constructor() { }
}
