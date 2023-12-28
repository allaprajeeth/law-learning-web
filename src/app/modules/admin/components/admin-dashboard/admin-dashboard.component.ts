// Import necessary modules from Angular and Angular Material
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  menuItems: RouteInfo[];

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Register Material Icons
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'person',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg')
    );
    // Add more icons as needed

    // Initialize menuItems
    this.menuItems = [
      { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
      { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
      // Add more menu items
    ];
  }

  ngOnInit() {
    // You can perform additional initialization logic here
  }

  isMobileMenu() {
    // Adjust the logic for checking mobile menu as needed
    return window.innerWidth <= 991;
  }
}

// Define the RouteInfo interface
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

// }
