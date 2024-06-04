import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Notifications } from 'src/app/common/models/notification.model';
import { Pagination } from 'src/app/common/models/pagination.model';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';

@Component({
  selector: 'app-shared-notification',
  templateUrl: './shared-notification.component.html',
  styleUrls: ['./shared-notification.component.scss'],
})
export class SharedNotificationComponent implements OnInit {
  notificationOpened: boolean = false;
  notifications: Notifications[] = [];
  role: string | undefined;
  pagination: Pagination = new Pagination();
  constructor(private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
    private authService: AuthTokenService,) {
    const userDetails = this.authService.getUserDetails();
    this.role = userDetails?.role
    
  }

  ngOnInit() {
    this.cdr.detectChanges();
    this.fetchNotifications();
  }

  deleteNotification(id: number) {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/profile/notifications/${id}`;
    this.http.delete(apiUrl).subscribe(
      () => {
        console.log('notification deleted successfully');
        this.notifications = this.notifications.filter(notification => notification.id !== id);
      },
      (error) => {
        console.error('Error deleting library:', error);
      }
    );
    this.cdr.detectChanges();
  }


  fetchNotifications(): void {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/profile/notifications?page=${this.pagination.page}&size=${this.pagination.size}&sort=createdDate,desc` ;
   
    this.http.get<any>(apiUrl).subscribe(response => {
      const notifications: Notifications[] = response.data.content;
      this.pagination.totalElements=response.data.totalElements
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
            if (notification.sourceType === 'COURSE') {
                route = `/instructor/courses/${notification.sourceId}`;
            } else {
                route = `/instructor/${routePrefix}/${notification.sourceId}`;
            }
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
        this.navigateToRoute(notification, 'courseinfo');
        break;
      case 'LIBRARY':
        this.navigateToRoute(notification, 'libraries');
        break;
      default:
        console.error('Invalid source type.');
    }
  }

  setreadnotification(id: number): void {
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/profile/notifications/${id}`;
    this.http.post(apiUrl, id).subscribe(
      () => {
        console.log('Notifications read successfully');
      },
      (error) => {
        console.error('Error deleting library:', error);
      }
    );

  }

  onPageChange(pagination: Pagination) {
    this.pagination.page  = pagination.page;
    this.pagination.size  = pagination.size;
    this.fetchNotifications()
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
