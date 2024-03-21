import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent {
  @Output() roleSelected = new EventEmitter<string>();
  @Output() notificationSelected = new EventEmitter<string>();

  showRoles: boolean = false;
  showNotifications: boolean = false;
  selectedRole: string | null = null

  toggleRoles(): void {
    this.showRoles = !this.showRoles;
  }
  
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  selectRole(role: string): void {
    this.roleSelected.emit(role);  ;
    this.selectedRole = role; 
    // this.showRoles = false; 
  }

  selectNotification(notification: string): void {
    console.log('Selected Notification:', notification);
    this.notificationSelected.emit(notification);
    // Add any specific logic for handling notification selection
  }

}
