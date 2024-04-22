import { Component } from '@angular/core';
import { PopupService } from 'src/popup.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../common/models/user.model';
import { Subscription } from 'rxjs';
import { AuthTokenService } from '../../../../../src/app/common/services/auth-token/auth-token.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  showLogoutPopup = false;

  userRole: string | undefined;
  isLoggedIn: boolean = false;
  userDetails: UserModel | null = null;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  private userDetailsSubscription: Subscription | undefined;

  constructor(
    private sharedService: PopupService,
    private logoutService: LogoutService,
    private router: Router,
    private authService: AuthTokenService
  ) {}

  ngOnInit() {
    this.userDetailsSubscription = this.authService.userDetails$.subscribe(
      (userDetails: UserModel | null) => {
        this.userRole = userDetails?.role;
        this.name = userDetails?.name;
        this.email = userDetails?.email;
        this.phone = userDetails?.phone;
      }
    );
  }
  onLogoutClick(): void {
    this.showLogoutPopup = true;
  }

  onClosePopup(): void {
    this.showLogoutPopup = false;
  }

  onLogout(): void {
    this.sharedService.showLogoutAlert = true;

    this.logoutService.logOutUser().subscribe(() => {
      console.log('logged out successfully');
    });

    setTimeout(() => {
      this.sharedService.showLogoutAlert = false;
    }, 5000);
    this.router.navigate(['/']);
    this.showLogoutPopup = false;
  }

  userMenuMap: { [key: string]: UserMenuMap[] } = {
    SUBSCRIBER: [
      { name: 'Profile', route: '/subscriber/profile' },
      { name: 'Account Security', route: '/subscriber/acSecurity' },
      { name: 'Notification Settings', route: '/subscriber/notifications' },
      { name: 'My Publishings', route: '/subscriber/articleHistory' },
      { name: 'Contact Us', route: '/subscriber/contactus' },
      { name: 'Terms & Conditions', route: '/subscriber/termsandconditions' },
      { name: 'Deleting-account', route: '/subscriber/deleting-account' },
    ],
    INSTRUCTOR: [
      {name:'Create your profile', route:'/instructor/create-profile' },
      { name: 'Profile', route: '/instructor/profile' },
      { name: 'Account Security', route: '/instructor/acSecurity' },
      { name: 'Notification Settings', route: '/instructor/notifications' },
      { name: 'My Publishings', route: '/instructor/articlehistory' },
      { name: 'Courses Status', route: '/instructor/uploadstatus' },
      { name: 'Contact Us', route: '/instructor/termsandconditions' },
      { name: 'Terms & Conditions', route: '/instructor/contactus' },
      { name: 'Deleting-account', route: '/instructor/deleting-account' },
    ],
    REVIEWER: [
      { name: 'Profile', route: '/reviewer/profile' },
      { name: 'Account Security', route: '/reviewer/acSecurity' },
      { name: 'Notification Settings', route: '/reviewer/notifications' },
      { name: 'Courses History', route: '/reviewer/courses-history' },
      { name: 'Article History', route: '/reviewer/articleHistory' },
      { name: 'Contact Us', route: '/reviewer/contactus' },
      { name: 'Terms & Conditions', route: '/reviewer/termsandconditions' },
      { name: 'Deleting-account', route: '/reviewer/deleting-account' },
    ],
    CONTENTMANAGER: [
      { name: 'Profile ', route: '/authentication/profile' },
      { name: 'Account Security', route: '/authentication/acSecurity' },
      { name: 'Notification Settings', route: '/authentication/notifications' },
      { name: 'Courses History' , route: '/authentication/courses-history'},
      { name: 'ArticleHistory', route: '/authentication/articleListHistory' },
      { name: 'Contact Us', route: '/authentication/contactus' },
      {
        name: 'Terms & Conditions',
        route: '/authentication/termsandconditions',
      },
      { name: 'Deleting-account', route: '/authentication/deleting-account' },
    ],
    ADMIN: [
      { name: 'Profile', route: '/admin/profile' },
      { name: 'Account Security', route: '/admin/acSecurity' },
      { name: 'Notification Settings', route: '/admin/notifications' },
      { name: 'Library History', route: '/admin/library-history' },
      { name: 'Courses History', route: '/admin/courses-history' },
      { name: 'Article History', route: '/admin/article-history' },
      { name: 'Contact Us', route: '/admin/contactus' },
      { name: 'Terms & Conditions', route: '/admin/termsandconditions' },
      { name: 'Deleting-account', route: '/admin/deleting-account' },
    ],
  };


  onDeleteAccountClick(): void {
    let deleteAccountRoute: string;
  
    switch (this.userRole) {
      case 'SUBSCRIBER':
        deleteAccountRoute = '/subscriber/delete-account';
        break;
      case 'INSTRUCTOR':
        deleteAccountRoute = '/instructor/delete-account';
        break;
      case 'ADMIN':
        deleteAccountRoute = '/admin/delete-account';
        break;
      case 'REVIEWER':
        deleteAccountRoute = '/reviewer/delete-account';
        break;
      case 'CONTENTMANAGER':
        deleteAccountRoute = '/authentication/delete-account';
        break;
      
      default:
        console.error('Unsupported user role for delete account');
        return;
    }
  
    this.router.navigate([deleteAccountRoute]);
  }
  
}
export interface UserMenuMap {
  name: string;
  route?: string;
}
