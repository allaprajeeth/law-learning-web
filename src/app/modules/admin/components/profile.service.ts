import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userName: string = '';

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }
  constructor() { }
}
