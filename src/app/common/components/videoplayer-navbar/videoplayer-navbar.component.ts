import { Component } from '@angular/core';

@Component({
  selector: 'app-videoplayer-navbar',
  templateUrl: './videoplayer-navbar.component.html',
  styleUrls: ['./videoplayer-navbar.component.scss']
})
export class VideoplayerNavbarComponent {
  showPopup: boolean = false;
  isMore = false;
  isProgress = false;
  isShareable = false;
  show = false;
  pop = false;
  stars = [1, 2, 3, 4, 5];
  selected = 0;
  
  togglemore() {
    this.isMore = !this.isMore;
  }
  openpopup() {
    this.show = true;
  }
  closepopup() {
    this.show = false;
  }
  popup() {
    this.pop = !this.pop;
  }
  updaterating(r: any) {
    this.selected = r;
  }
}
