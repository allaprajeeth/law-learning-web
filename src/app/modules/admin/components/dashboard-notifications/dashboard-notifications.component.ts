import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
interface Notification {
  heading: string;
  message: string;
  icon: string;
  notificationDate: string;
  editedMessage?: string; // Make sure it's optional
}
@Component({
  selector: 'app-dashboard-notifications',
  templateUrl: './dashboard-notifications.component.html',
  styleUrls: ['./dashboard-notifications.component.scss']
})
export class DashboardNotificationsComponent  {
  



  notifications: Notification[] = [
    {
      heading: 'Check This Course',
      message: 'New Course Added.',
      icon: 'M',
      notificationDate: '25-11-2023',
    },
    {
      heading: 'Courses Reminder',
      message: 'Upcoming New Courses',
      icon: 'E',
      notificationDate: '05-10-2023',
    },
    {
      heading: 'Promotion Codes',
      message: 'Check the Promotion Codes',
      icon: 'M',
      notificationDate: '13-09-2023',
    },
    {
      heading: 'Check This Course',
      message: 'New Course Added.',
      icon: 'E',
      notificationDate: '28-10-2023',
    },
    {
      heading: 'New Message',
      message: 'You have a new message',
      icon: 'M',
      notificationDate: '17-11-2023',
    },
    
  ];
  editingIndex: number = -1; // Track which notification is being edited
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}



  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  onEditClick(index: number): void {
    this.editingIndex = index;
  }

  onSaveClick(index: number): void {
    // Save the edited content and reset editingIndex
    const editedMessage = this.notifications[index].editedMessage;
    if (editedMessage !== undefined) {
      this.notifications[index].message = editedMessage;
    }
    this.editingIndex = -1;
  }
  

  onCancelClick(): void {
    // Reset editingIndex without saving changes
    this.editingIndex = -1;
  }
 
  
  
}
