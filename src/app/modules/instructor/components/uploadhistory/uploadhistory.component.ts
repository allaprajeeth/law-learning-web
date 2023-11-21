// uploadhistory.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-uploadhistory',
  templateUrl: './uploadhistory.component.html',
  styleUrls: ['./uploadhistory.component.scss']
})
export class UploadhistoryComponent implements OnInit {
  course: any;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const courseParam = params.get('course');
      if (courseParam) {
        this.course = JSON.parse(courseParam);
      }
    });
  }

 goBack(): void{
  this.location.back();

 } 
 getStatusColor(status: string): string {
  switch (status) {
    case 'Under-Review':
      return 'blue';
    case 'Rejected':
      return 'red';
    case 'Approved':
      return 'green';
    default:
      return ''; // No specific color for other statuses
  }
}
}
