// profile-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  user: any;// Replace 'any' with your user model/interface

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Fetch user data based on route parameter (userId)
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId) {
      // Replace the following line with your user fetching logic
      this.user = this.fetchUserData(userId);
    } else {
      console.error('User ID is null.');
      // Handle the situation where the user ID is null (e.g., redirect, show error message, etc.)
    }
  }

  toggleBlockStatus(): void {
    // Implement the logic to toggle block status (backend call, etc.)
    this.user.isBlocked = !this.user.isBlocked;
  }

  editComment(comment: any): void {
    // Implement the logic to edit a comment
  }

  deleteComment(comment: any): void {
    // Implement the logic to delete a comment
  }

  goBack(): void {
    this.router.navigate(['/admin/all-profiles']); // Replace with the appropriate route
  }

  // Replace this with your actual method to fetch user data
  private fetchUserData(userId: string): any {
    // Mock data - Replace with your actual fetching logic
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      coursesPurchased: 5,
      articlesWritten: 10,
      lastActive: new Date(),
      isBlocked: false,
      comments: [
        { text: 'Great course!', date: new Date() },
        { text: 'Interesting article.', date: new Date() }
      ]
    };
  }
}
