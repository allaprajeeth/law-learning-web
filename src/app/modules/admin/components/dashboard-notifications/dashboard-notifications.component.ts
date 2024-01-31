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
      icon: 'C',
      notificationDate: '13-09-2023',
      type: 'comments'
    },
    {
      heading: 'Comment',
      message: 'New Comment Added.',
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


  // ngOnInit() {
  //   this.cdr.detectChanges();
  // }


deleteNotification(index: number) {
  
    const isConfirmed = window.confirm('Are you sure you want to delete the notification?');

  if (isConfirmed) {
    // User clicked 'OK', perform the delete action
    // Implement your logic to delete the notification here
  
    this.cdr.detectChanges();
    this.notifications.splice(index, 1);
  }
  }

  

  filteredNotifications: Notification[] = []; // Array to store filtered notifications
  selectedNotification: string = 'all'; // Default selected notification type
  

  editingIndex: number = -1; // Track which notification is being edited
  constructor(private cdr: ChangeDetectorRef, private router: Router, private zone: NgZone) {}


  ngOnInit(): void {
    // Initialize filteredNotifications with all notifications initially
    this.filteredNotifications = this.notifications;

    this.cdr.detectChanges();
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
    // Find all objects with heading 'Comment'
    const commentNotifications = this.notifications.filter(notification => notification.heading === 'Comment');
  
    // Update the edited content for each matching notification
    commentNotifications.forEach(commentNotification => {
      const editedMessage = commentNotification.editedMessage;
      if (editedMessage !== undefined) {
        commentNotification.message = editedMessage;
      }
    }); 
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
