import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Notification {
  heading: string;
  message: string;
  icon: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  notificationOpened: boolean = false;
 
  notifications: Notification[] = [
    { heading: 'Check This Course', message: 'New Course Added.', icon: 'M' },
    { heading: 'Courses Reminder', message: 'Upcoming New Courses', icon: 'E' },
    { heading: 'Promotion Codes', message: 'Check the Promotion Codes', icon: 'M' },
    { heading: 'Check This Course', message: 'New Course Added.', icon: 'E' },
    { heading: 'New Message', message: 'You have a new message', icon: 'M' },
    { heading: 'Courses Reminder', message: 'Upcoming New Courses', icon: 'E' },
  ];

 

  constructor(private cdr: ChangeDetectorRef, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }
  
  deleteNotification(index: number) {
    const deletedNotification = this.notifications[index];
    this.notifications.splice(index, 1);
    const snackBarRef = this.snackBar.open('Notification deleted', 'Undo', {
      duration: 5000,
      verticalPosition: 'top', 
     
    });
    snackBarRef.onAction().subscribe(() => {
      this.notifications.splice(index, 0, deletedNotification);
    });
    this.cdr.detectChanges();
  }
  

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  currentDate: Date = new Date();

}

