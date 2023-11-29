import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Notification {
  heading: string;
  message: string;
  icon: string;
  notificationDate: string;
}

@Component({
  selector: 'app-shared-notification',
  templateUrl: './shared-notification.component.html',
  styleUrls: ['./shared-notification.component.scss'],
})
export class SharedNotificationComponent implements OnInit {
  notificationOpened: boolean = false;

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
    {
      heading: 'Courses Reminder',
      message: 'Upcoming New Courses',
      icon: 'E',
      notificationDate: '10-09-2023',
    },
  ];

  openNotification() {
    this.notificationOpened = true;

    this.router.navigate(['instructor/notification/notification-item-clicked']);
  }

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }

  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
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
}

