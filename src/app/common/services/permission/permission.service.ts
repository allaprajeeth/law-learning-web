import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  hasPermission() {
    return false;  //hasPermission False then display first-nav
    // return true; 
    //hasPermission true then display app-nav
  }
}
