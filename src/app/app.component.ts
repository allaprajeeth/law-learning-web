import { Component, OnInit } from '@angular/core';
import { LoadingService } from './common/services/loading/loading.service';
import { PermissionService } from './common/services/permission/permission.service';
import { Router, NavigationEnd } from '@angular/router';
import { PdfService } from './sharedService.service';
import { LoginService } from './common/components/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'law-learning';

   constructor(private router: Router,private pdfService: PdfService,
    private loginService: LoginService) {} 

    // getUserInfoFromLocalStorage(): void {
    //   const storedJwtToken = localStorage.getItem('jwtToken');
    //   const storedLoggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  
    //   if (storedJwtToken && storedLoggedInUserEmail) {
    //     this.loginService.authTokenService.jwtToken$.next(storedJwtToken);
    //     this.loginService.loggedInUserEmail$.next(storedLoggedInUserEmail);
    //   }
    // }
  
    // ngOnInit() {
    //   this.getUserInfoFromLocalStorage();
    //   // ... (existing code)
    // }

    // ngOnInit() {
    //   // Read data from localStorage on application initialization
    //   const storedJwtToken = localStorage.getItem('jwtToken');
    //   const storedLoggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    
    //   // Check if data exists in localStorage and update the LoginService accordingly
    //   if (storedJwtToken && storedLoggedInUserEmail) {
    //     this.loginService.getAuthTokenService().jwtToken$.next(storedJwtToken);
    //     this.loginService.loggedInUserEmail$.next(storedLoggedInUserEmail);
    //   }
    // }
   
  //  ngOnInit() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       window.scrollTo(0, 0);
  //     }
  //   });
  // }
  
}
