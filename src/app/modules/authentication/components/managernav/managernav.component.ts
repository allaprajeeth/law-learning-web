import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
import { LoginService } from 'src/app/common/components/login/services/login.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';


@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.scss']
})
export class ManagernavComponent implements OnInit{

  showLogoutPopup = false;
  auth: object | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneno: string | undefined;
  jwtToken: string | null = null;

  constructor(
    private router: Router,
    private sharedService: PopupService,
    private logoutService:LogoutService,
    private userDetailsService: UserDetailsService
   
    ) { }

    ngOnInit() {
      
      this.userDetailsService.getUserInfoFromLocalStorage();
      this.name = this.userDetailsService.name;
      this.email = this.userDetailsService.email;
      this.phoneno = this.userDetailsService.phoneno;
      this.jwtToken = this.userDetailsService.jwtToken;
  
    }


  onUserCircleClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/authentication/profile']);
  }
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
    this.logoutService.logOutUser().subscribe(() => { });
    this.showLogoutPopup = false;
  }
}
