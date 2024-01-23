import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-audit-report2',
  templateUrl: './audit-report2.component.html',
  styleUrls: ['./audit-report2.component.scss']
})
export class AuditReport2Component {

  constructor(private location:Location) {}
  goBack(){
    this.location.back();
  }
}
