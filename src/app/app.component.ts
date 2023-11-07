import { Component, OnInit } from '@angular/core';
import { LoadingService } from './common/services/loading/loading.service';
import { PermissionService } from './common/services/permission/permission.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'law-learning';
   constructor() {} 
}
