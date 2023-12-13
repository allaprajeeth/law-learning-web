import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss'],
})
export class LogoutPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onClose(): void {
    this.closePopup.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}

