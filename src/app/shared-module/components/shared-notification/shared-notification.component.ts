import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Notifications } from 'src/app/common/models/notification.model';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';

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

  notifications: Notifications[] = [];
  role:string | undefined;
  constructor(private cdr: ChangeDetectorRef,
     private router: Router,
     private http: HttpClient,
     private authService: AuthTokenService,) {

      const userDetails = this.authService.getUserDetails();
      this.role = userDetails?.role 
     }

  ngOnInit() {
    this.cdr.detectChanges();
    this.fetchNotifications()
  }

  deleteNotification(id:number) {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/profile/notifications/${id}`;
    this.http.delete(apiUrl).subscribe(
      () => {
        console.log('notification deleted successfully');
      },
      (error) => {
        console.error('Error deleting library:', error);
      }
    );
    this.cdr.detectChanges();
  }
 
 
  fetchNotifications(): void {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/profile/notifications`;
    const params = new HttpParams()
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      const notifications: Notifications[] = response.data.content; 
      notifications.forEach(notification => {
        let message = '';
        if (notification.type === 'CREATED') {
          switch (notification.sourceType) {
            case 'COURSE':
              message = 'New Course added';
              break;
            case 'ARTICLE':
              message = 'New Article added';
              break;
            case 'LIBRARY':
              message = 'New Document added to the library';
              break;
            default:
              message = 'New Content added';
          }
        } else if (notification.type === 'UPDATED') {
          switch (notification.sourceType) {
            case 'COURSE':
              message = 'Course updated';
              break;
            case 'ARTICLE':
              message = 'Article updated';
              break;
            case 'LIBRARY':
              message = 'Document updated in the library';
              break;
            default:
              message = 'Content updated';
          }
        }
        notification.message = message; 
      });
      this.notifications = notifications;
    });
  }

  navigateToRoute(notification: Notifications, routePrefix: string): void {
    let route: string;
    switch (this.role) {
      case 'SUBSCRIBER':
        route = `/subscriber/${routePrefix}/${notification.sourceId}`;
        break;
      case 'INSTRUCTOR':
        route = `/instructor/${routePrefix}/${notification.sourceId}`;
        break;
      case 'ADMIN':
        route = `/admin/${routePrefix}/${notification.sourceId}`;
        break;
      case 'REVIEWER':
        route = `/reviewer/${routePrefix}/${notification.sourceId}`;
        break;
      case 'CONTENTMANAGER':
        route = `/authentication/${routePrefix}/${notification.sourceId}`;
        break;
      default:
        route = `/${routePrefix}/${notification.sourceType.toLowerCase()}/${notification.sourceId}`;
    }
  
    this.router.navigateByUrl(route);
  }

  openNotification(notification: Notifications): void {
    this.setreadnotification(notification.id)
    this.notificationOpened = true;
  
    switch (notification.sourceType) {
      case 'ARTICLE':
        this.navigateToRoute(notification, 'publish-articles');
        break;
      case 'COURSE':
        //change routing here after completion of piblish courses
        this.navigateToRoute(notification, 'publish-courses');
        break;
      case 'LIBRARY':
        this.navigateToRoute(notification, 'libraries');
        break;
      default:
        console.error('Invalid source type.');
    }
  }

  setreadnotification(id:number): void {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/profile/notifications/${id}`;
    this.http.post(apiUrl,id).subscribe(
      () => {
        console.log('Notifications read successfully');
      },
      (error) => {
        console.error('Error deleting library:', error);
      }
    );

  }

}

