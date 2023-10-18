import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/popup.service';

@Component({
  selector: 'app-firstnav',
  templateUrl: './firstnav.component.html',
  styleUrls: ['./firstnav.component.scss']
})
export class FirstnavComponent {
  
  constructor(private sharedService: PopupService) {}

  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }



  // showLogoutAlert: boolean = true;

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.showLogoutAlert = false;
  //   }, 5000); // Set timeout for 5 seconds (5000 milliseconds)
  // }
}
