import { Directive, OnInit, OnDestroy } from '@angular/core';
import { MyServiceService } from './my-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[appMyDirective]'
})
export class MyDirectiveDirective implements OnInit, OnDestroy  {
  private dialogSubscription: Subscription = new Subscription;

  constructor(
    private myService: MyServiceService,
    private dialog: MatDialog
  ) {}


  ngOnInit() {
    this.dialogSubscription = this.myService.isOpen$.subscribe(isOpen => {
      if (isOpen) {
        this.dialog.open(EditEmailComponent, {
          width: '400px',
          backdropClass: 'custom-dialog-backdrop-class',
          panelClass: 'custom-dialog-panel-class'
        });
      }
    });
  }
  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }
  
}
