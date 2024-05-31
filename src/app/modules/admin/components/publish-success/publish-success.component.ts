import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-success',
  templateUrl: './publish-success.component.html',
  styleUrls: ['./publish-success.component.scss']
})
export class PublishSuccessComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['admin/homepage']); 
  }
}
