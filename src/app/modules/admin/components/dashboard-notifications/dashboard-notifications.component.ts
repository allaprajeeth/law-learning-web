import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

interface Notification {
  heading: string;
  message: string;
  icon: string;
  notificationDate: string;
  type: string;
  editedMessage?: string; // Make sure it's optional
}
@Component({
  selector: 'app-dashboard-notifications',
  templateUrl: './dashboard-notifications.component.html',
  styleUrls: ['./dashboard-notifications.component.scss']
})
export class DashboardNotificationsComponent  implements OnInit{
  



  notifications: Notification[] = [
    {
      heading: 'Course',
      message: 'New Course Added.',
      icon: 'M',
      notificationDate: '25-11-2023',
      type: 'courses'
    },
    {
      heading: 'Article',
      message: 'Upcoming New Courses',
      icon: 'E',
      notificationDate: '05-10-2023',
      type: 'articles'
    },
    {
      heading: 'Comment',
      message: 'Check the Promotion Codes',
      icon: 'M',
      notificationDate: '13-09-2023',
      type: 'comments'
    },
    {
      heading: 'Comment',
      message: 'New Course Added.',
      icon: 'E',
      notificationDate: '28-10-2023',
      type: 'comments'
    },
    {
      heading: 'joined',
      message: 'You have a new message',
      icon: 'M',
      notificationDate: '17-11-2023',
      type: 'joined'
    },
  ];

  filteredNotifications: Notification[] = []; // Array to store filtered notifications
  selectedNotification: string = 'all'; // Default selected notification type
  

  editingIndex: number = -1; // Track which notification is being edited
  constructor(private cdr: ChangeDetectorRef, private router: Router, private zone: NgZone) {}

  ngOnInit(): void {
    // Initialize filteredNotifications with all notifications initially
    this.filteredNotifications = this.notifications;
  }

  // getRandomColor(): string {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
  
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
 
  selectNotification(notification: string): void {
    this.zone.run(() => {
      this.selectedNotification = notification;
  
      if (notification === 'all') {
        this.filteredNotifications = this.notifications;
      } else {
        this.filteredNotifications = this.notifications.filter(
          (item) => item.type === notification
        );
      }
  
      // Reset editingIndex without saving changes
      this.editingIndex = -1;
    });
  }
  
  onNotificationSelected(notification: string): void {
    this.selectNotification(notification);
  }
  
}
