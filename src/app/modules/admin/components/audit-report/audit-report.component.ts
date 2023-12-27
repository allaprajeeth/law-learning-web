import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.scss']
})
export class AuditReportComponent {
constructor(private location:Location) {}
  goBack(){
    this.location.back();
  }
}
