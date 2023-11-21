import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadstatus',
  templateUrl: './uploadstatus.component.html',
  styleUrls: ['./uploadstatus.component.scss']
})
export class UploadstatusComponent {
  courses = [
    { 
      name: 'Introduction to Law',
      approver: 'Johnson',
      status: 'Pending',
      actions: 'Pending',
      submissionDate: '2023-01-15 09:30 AM',
      actionDate: '-'
    },
   
    {
      name: 'Professional Responsibility',
      approver: 'John Davis',
      status: 'Under-Review',
      actions: 'Under-Review',
      submissionDate: '2023-03-10 11:00 AM',
      actionDate: '-'
    },
    {
      name: 'Intellectual Property Law',
      approver: 'Johnson',
      status: 'Under-Review',
      actions: 'Under-Review',
      submissionDate: '2023-03-10 11:00 AM',
      actionDate: '-'
    },
    {
      name: 'Legal Research and Writing',
      approver: 'John Smith',
      status: 'Approved',
      actions: 'Approved by Prof. Johnson',
      submissionDate: '2023-02-02 02:45 PM',
      actionDate: '2023-02-05 10:15 AM'
    },
    {
      name: 'International Human Rights',
      approver: 'John Smith',
      status: 'Rejected',
      actions: 'Rejected by John Smith',
      submissionDate: '2023-04-05 03:20 PM',
      actionDate: '2023-04-08 01:30 PM'
    },
    {
      name: 'Civil Procedure',
      approver: 'Johnson',
      status: 'Approved',
      actions: 'Approved by Johnson',
      submissionDate: '2023-05-20 05:45 PM',
      actionDate: '2023-05-25 09:00 AM'
    }
  ];
  

  // toggleDetails(course: any): void {
    
  //   console.log(course);
  // }
  constructor(private router: Router) {}

  

  viewDetails(course: any): void {
    this.router.navigate(['instructor/uploadhistory', { course: JSON.stringify(course) }]);
  }

  getStatusStyles(status: string): any {
    switch (status) {
      case 'Under-Review':
        return { color: 'Blue' };
      case 'Rejected':
        return { color: 'red' };
      case 'Approved':
        return { color: 'green' };
      default:
        return {}; // No specific style for other statuses
    }
}
}
