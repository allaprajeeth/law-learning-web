// all-profiles.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent implements OnInit {
  subscriberProfiles: any[] = [
    { username: 'Subscriber1', role: 'subscriber' },
    { username: 'Subscriber2', role: 'subscriber' },
    // Add more subscriber profiles
  ];

  instructorProfiles: any[] = [
    { username: 'Instructor1', role: 'instructor' },
    { username: 'Instructor2', role: 'instructor' },
    // Add more instructor profiles
  ];

  reviewerProfiles: any[] = [
    { username: 'Reviewer1', role: 'reviewer' },
    { username: 'Reviewer2', role: 'reviewer' },
    // Add more reviewer profiles
  ];

  contentManagerProfiles: any[] = [
    { username: 'ContentManager1', role: 'content-manager' },
    { username: 'ContentManager2', role: 'content-manager' },
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
}
