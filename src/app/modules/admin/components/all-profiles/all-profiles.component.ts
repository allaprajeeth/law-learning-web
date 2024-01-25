// all-profiles.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent implements OnInit {
  subscriberProfiles: any[] = [
    { username: 'Pushpa', role: 'Subscriber', status: 'Active' },
    { username: 'Vani', role: 'Subscriber', status: 'Inactive' },
    { username: 'Lokesh', role: 'Subscriber', status: 'Blocked' },
    // Add more subscriber profiles
  ];

  instructorProfiles: any[] = [
    { username: 'John', role: 'Instructor', status: 'Active' },
    { username: 'Davis', role: 'Instructor', status: 'Inactive' },
    // Add more instructor profiles
  ];

  reviewerProfiles: any[] = [
    { username: 'Wilson', role: 'Reviewer', status: 'Active' },
    { username: 'Smith', role: 'Reviewer', status: 'Inactive' },
    // Add more reviewer profiles
  ];

  contentManagerProfiles: any[] = [
    { username: 'Johnson', role: 'Content-manager', status: 'Active' },
    // { username: 'sarah', role: 'Content-manager', status: 'Inactive' },
    // Add more content manager profiles
  ];

  allProfiles: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Combine all profiles into a single array
    this.allProfiles = [
      ...this.subscriberProfiles,
      ...this.instructorProfiles,
      ...this.reviewerProfiles,
      ...this.contentManagerProfiles,
    ];
  }

  getInitials(username: string): string {
    // Logic to extract initials from the username, e.g., "John Doe" => "JD"
    const initials = username.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  }

  getStatusStyles(status: string): any {
    switch (status.toLowerCase()) {
      case 'inactive':
        return { color: 'blue' };
      case 'blocked':
        return { color: 'red' };
      case 'active':
        return { color: 'green' };
      default:
        return {};
    }
  }
  
}
