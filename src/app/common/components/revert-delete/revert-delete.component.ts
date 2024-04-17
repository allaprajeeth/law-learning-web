import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PdfService } from 'src/app/sharedService.service';
import { MatSnackBar,  MatSnackBarVerticalPosition  } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-revert-delete',
  templateUrl: './revert-delete.component.html',
  styleUrls: ['./revert-delete.component.scss']
})
export class RevertDeleteComponent implements OnInit, OnDestroy {
  validationKey: string = '';
  emailOtp: string = '';
  phoneOtp: string = '';
  isDeleted: boolean = true;
  showOtpFields: boolean = false;
  userEmail: string = '';
  userPhone: string = '';
  // remainingTime: number = 0;
  remainingTime: string = '72 hours';
  countdownSubscription: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private deleteTimeService: PdfService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.validationKey = params['validationKey'];
      this.userEmail = params['email']; 
      this.userPhone = params['phone']; 
    });
    // Call the API to fetch the profile data
  this.fetchProfileData();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the countdown observable to prevent memory leaks
    this.countdownSubscription?.unsubscribe();
  }
  fetchProfileData() {
    // Make an HTTP request to fetch the profile data
    this.http.get<any>(`${environment.endpoints.secureBaseURL}/profile`).subscribe(
      (response) => {
        // Extract the updated date from the response
        const updatedDate = new Date(response.data.updatedDate);
        
        // Calculate the remaining time based on the updated date
        this.calculateRemainingTime(updatedDate);
      },
      (error) => {
        console.error('Error fetching profile data:', error);
        // Handle error response if needed
      }
    );
  }

  calculateRemainingTime(updatedDate: Date) {
    // Set the deletion time to 72 hours from the updated date
    const deletionTime = new Date(updatedDate.getTime() + (72 * 60 * 60 * 1000));
  
    // Update the remaining time every second
    this.countdownSubscription = interval(1000).subscribe(() => {
      const currentTime = new Date();
      const difference = deletionTime.getTime() - currentTime.getTime();
  
      if (difference <= 0) {
        // If time's up, clear the subscription and set remaining time to 0
        this.remainingTime = '0 hours 0 minutes 0 seconds';
        this.countdownSubscription?.unsubscribe();
      } else {
        // Calculate remaining hours, minutes, and seconds
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Format the remaining time
        this.remainingTime = `${hours}:${minutes}:${seconds} hours`;
      }
    });
  }
  showOtpInputs() {
    this.sendOtpRequest(); 
    this.showOtpFields = true;
  }
  sendOtpRequest() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const requestBody = {
      type: 'SEND_OTP',
      // email: this.userEmail, 
      // phone: this.userPhone 
    };

    this.http.post<any>(`${environment.endpoints.secureBaseURL}/profile/restore`, requestBody).subscribe(
      (response) => {
        console.log('OTP request sent:', response);
        this.validationKey = response.data.validation_key;
        console.log('validation_key', this.validationKey)
      },
      (error) => {
        console.error('Error sending OTP request:', error);
      }
    );
  }

  
  restoreAccount() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const requestBody = {
      type: 'VERIFY_OTP',
      validation_key: this.validationKey,
      email_otp: this.emailOtp,
      phone_otp: this.phoneOtp
    };

    this.http.post<any>(`${environment.endpoints.secureBaseURL}/profile/restore`, requestBody, { headers }).subscribe(
      (response) => {
        console.log('OTP verification successful:', response);
        // Show success message in a popup
        this.snackBar.open('Your account has been restored successfully', 'Close', {
          duration: 5000, 
          verticalPosition: 'top'
        });
        this.location.back();
      },
      (error) => {
        console.error('Error verifying OTP:', error);
        // Handle error response if needed
      }
    );
  }
}
