import { Component } from '@angular/core';
import { LoadingService } from './common/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'law-learning';
  constructor(public loadingService: LoadingService){

  }
}
