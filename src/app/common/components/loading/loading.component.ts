import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service'
@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading | async" class="loading-overlay">
      <mat-spinner></mat-spinner>
    </div>
    <div *ngIf="errorMessage | async as error" class="error-overlay">
      <div class="error-message">{{ error }}</div>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading = this.loadingService.loading$;
  errorMessage = this.loadingService.error$;

  constructor(private loadingService: LoadingService) {}
}
