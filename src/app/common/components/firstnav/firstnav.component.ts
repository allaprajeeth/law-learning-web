import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/popup.service';
import { TermsandconComponent } from '../../termsandcon/termsandcon.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-firstnav',
  templateUrl: './firstnav.component.html',
  styleUrls: ['./firstnav.component.scss']
})
export class FirstnavComponent {
  
  constructor(
    private sharedService: PopupService,
    public dialog: MatDialog,) {}

  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }

  openModal() {
    this.dialog.open(TermsandconComponent, {
      width: '700px',
      height: '600px',
    });
  }

  // showLogoutAlert: boolean = true;

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.showLogoutAlert = false;
  //   }, 5000); // Set timeout for 5 seconds (5000 milliseconds)
  // }
}
