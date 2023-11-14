import { Component, OnInit } from '@angular/core';
import { LoadingService } from './common/services/loading/loading.service';
import { PermissionService } from './common/services/permission/permission.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'law-learning';
   constructor(private router: Router) {} 
   
  //  ngOnInit() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       window.scrollTo(0, 0);
  //     }
  //   });
  // }
  
}
