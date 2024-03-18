import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopupService } from 'src/popup.service';
import { TermsandconComponent } from '../../termsandcon/termsandcon.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsService } from '../../services/user-details/user-details.service';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-firstnav',
  templateUrl: './firstnav.component.html',
  styleUrls: ['./firstnav.component.scss'],
})
export class FirstnavComponent {
  userRole: string | undefined;
  isLoggedIn: boolean = false;
  userDetails: UserModel | null = null;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  showLogoutPopup = false;
  
  private userDetailsSubscription: Subscription | undefined;
  constructor(
    private sharedService: PopupService,
    public dialog: MatDialog,
    private authService: AuthTokenService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {
    
    this.userDetailsSubscription = this.authService.userDetails$.subscribe((userDetails: UserModel | null)  => {
      this.userRole = userDetails?.role;
      this.name = userDetails?.name;
      this.email = userDetails?.email;
      this.phone = userDetails?.phone;
    });
    // this.cdr.detectChanges();
  }

  get getRole(): string {
    if (this.userDetails) {
      return this.userDetails.role;
    }
    return '';
  }
  openModal() {
    this.dialog.open(TermsandconComponent, {
      width: '700px',
      height: '600px',
    });
  }

  onUserCircleClick(event: Event) {
    event.preventDefault();

    const profileRouteMap: { [key: string]: string } = {
      ADMIN: '/admin/profile',
      CONTENTMANAGER: '/cm/profile',
      INSTRUCTOR: '/instructor/profile',
      REVIEWER: '/reviewer/profile',
      SUBSCRIBER: '/subscriber/profile',
    };

    const profileRoute = profileRouteMap[this.userRole || ''];

    if (profileRoute) {
      this.router.navigate([profileRoute]);
    }
  }

  roleNavigationMap: { [key: string]: RoleNavigationMap[] } = {
    SUBSCRIBER: [
      { name: 'Homepage', route: '/subscriber/homepage' },
      { name: 'Library', route: '/subscriber/library' },
      { name: 'Publishing Corner', route: '/subscriber/article' },
      { name: 'About Us', route: '/subscriber/aboutus' },
      { name: 'Notifications', route: '/subscriber/notification' },
      { name: 'Cart', route: '/subscriber/cart' },
    ],
    ADMIN: [
      { name: 'Homepage', route: '/admin/homepage' },
      { name: 'Library', route: '/admin/library' },
      { name: 'Publishing Corner', route: '/admin/article' },
      { name: 'About Us', route: '/admin/aboutus' },
      { name: 'Notifications', route: '/admin/notification' },
      { name: 'Dashboard', route: '/admin/dashboard' },
    ],
    CONTENTMANAGER: [
      { name: 'Homepage', route: '/authentication/homepage' },
      { name: 'Library', route: '/authentication/library' },
      { name: 'Publishing Corner', route: '/authentication/article' },
      { name: 'About Us', route: '/authentication/aboutus' },
      { name: 'Notifications', route: '/authentication/notification' },
    ],
    INSTRUCTOR: [
      { name: 'Homepage', route: '/instructor/homepage' },
      { name: 'Library', route: '/instructor/library' },
      { name: 'Publishing Corner', route: '/instructor/article' },
      { name: 'About Us', route: '/instructor/aboutus' },
      { name: 'Notifications', route: '/instructor/notification' },
    ],
    REVIEWER: [
      { name: 'Homepage', route: '/reviewer/homepage' },
      { name: 'Library', route: '/reviewer/library' },
      { name: 'Publishing Corner', route: '/reviewer/article' },
      { name: 'About Us', route: '/reviewer/aboutus' },
      { name: 'Notifications', route: '/reviewer/notification' },
    ],
    '': [
      { name: 'Library', route: '/library' },
      { name: 'Publishing Corner', route: '/article' },
      { name: 'About Us', route: '/aboutus' },
    ],
  };

  userMenuMap: { [key: string]: UserMenuMap[] } = {
    SUBSCRIBER: [
      { name: 'Profile', route: '/subscriber/profile' },
      { name: 'Account Security', route: '/subscriber/acSecurity' },
      { name: 'Notification Settings', route: '/subscriber/notifications' },
      { name: 'My Publishings', route: '/subscriber/articleHistory' }, 
      { name: 'Contact Us', route: '/subscriber/contactus' },
      { name: 'Terms & Conditions', route: '/subscriber/termsandconditions' },
    
      
    ],
    INSTRUCTOR: [
      { name: 'Profile', route: '/instructor/profile' },
      { name: 'Account Security', route: '/instructor/acSecurity' },
      { name: 'Notification Settings', route: '/instructor/notifications' },
      { name: 'My Publishings', route: '/instructor/articlehistory' },
      { name: 'Courses Status', route: '/instructor/uploadstatus' },
      { name: 'Contact Us', route: '/instructor/termsandconditions' },
      { name: 'Terms & Conditions', route: '/instructor/contactus' },
      
      
    ],
    REVIEWER: [
      { name: 'Profile', route: '/reviewer/profile' },
      { name: 'Account Security', route: '/reviewer/acSecurity' },
      { name: 'Notification Settings', route: '/reviewer/notifications' },
      { name: 'Courses History', route: '/reviewer/courses-history' },
      { name: 'Article History', route: '/reviewer/articleHistory' },
      { name: 'Contact Us', route: '/reviewer/contactus' },
      { name: 'Terms & Conditions', route: '/reviewer/termsandconditions' },
      
     
    ],
    CONTENTMANAGER: [
      { name: 'Profile ', route: '/authentication/profile' },
      { name: 'Account Security', route: '/authentication/acSecurity' },
      { name: 'Notification Settings', route: '/authentication/notifications' },
      { name: 'Courses History',  route: '/authentication/courses-history' },
      { name: 'ArticleHistory', route: '/authentication/articleListHistory' },
      { name: 'Contact Us', route: '/authentication/contactus' },
      { name: 'Terms & Conditions', route: '/authentication/termsandconditions' },
      
      
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
      
    ],
  };

  
  get showLogoutAlert(): boolean {
    return this.sharedService.showLogoutAlert;
  }

  onLogoutClick(): void {
    this.showLogoutPopup = true;
  }

  onClosePopup(): void {
    this.showLogoutPopup = false;
  }

  onLogout(): void {
    this.logoutService.logOutUser().subscribe(() => {});
    this.showLogoutPopup = false;
  }
}

export interface RoleNavigationMap {
  name: string;
  route: string;
}
export interface UserMenuMap {
  name: string;
  route?: string;
}
