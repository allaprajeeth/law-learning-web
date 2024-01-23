import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/popup.service';
import { LoginService } from 'src/app/common/components/login/services/login.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import * as AuthSelectors from '../../../../common/components/login/store/auth.selectors'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.scss']
})
export class ManagernavComponent implements OnInit{

  showLogoutPopup = false;
  auth: object | undefined;

  constructor(
    private router: Router,
    private sharedService: PopupService,
    private logoutService:LogoutService,
    private loginService:LoginService,
    private store: Store
    ) { }

    name="";
      email="";
      username="";

      getUserInfoFromLocalStorage(): void{


        const userDetailsString = localStorage.getItem('userDetails');
    // jwtToken
  
    if (userDetailsString) { 
      try {
        const userDetails = JSON.parse(userDetailsString);
  
        // Check if the expected properties are present
        if (userDetails && userDetails.name && userDetails.email && userDetails.phone) {
          this.name = userDetails.name;
          this.email = userDetails.email;
          this.username = userDetails.phone;
        } else {
          console.error('Invalid user details format:', userDetails);
        }
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
      }
 
      ngOnInit() {
        console.log("test", this.store);
        
        // this.loggedInUserEmail$ = this.store.select(AuthSelectors.selectLoggedInUserEmail);
        // this.loggedInUserPhone$ = this.store.select(AuthSelectors.selectLoggedInUserPhone);
        // this.loggedInUserName$ = this.store.select(AuthSelectors.selectLoggedInUserName);
    
        // this.loggedInUserEmail$.subscribe(email => {
        //   console.log('Logged In User Email:', email);
        // });
    
        // this.loggedInUserPhone$.subscribe(phone => {
        //   console.log('Logged In User Phone:', phone);
        // })
        
        this.store.subscribe(
          data =>
          { this.auth =data 
        console.log(this.auth)
        })
        
        // this.cartService.cartItemCount$.subscribe((count) => {
        //   this.cartItemCount = count;
        // });
    
        this.getUserInfoFromLocalStorage();
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
      this.sharedService.showLogoutAlert = true;

      setTimeout(() => {
        this.sharedService.showLogoutAlert = false;
      }, 5000);

      this.router.navigate(['/header']);
      this.showLogoutPopup = false;
  }
}
