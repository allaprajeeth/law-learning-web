import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/sharedService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shareddelete-account',
  templateUrl: './shareddelete-account.component.html',
  styleUrls: ['./shareddelete-account.component.scss']
})
export class ShareddeleteAccountComponent {
  loginForm: FormGroup;
  isOtpVisible: boolean = false;
  validationKey: string = '';
  isDeleted: boolean = false;
  userDetails: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private deleteTimeService: PdfService
  ) {
    this.loginForm = this.formBuilder.group({
      emailOtp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      phoneOtp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  closeAccountInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const requestBody = {
      type: 'SEND_OTP'
    };

    this.http.delete(`${environment.endpoints.secureBaseURL}/profile`, { headers, body: requestBody }).subscribe(
      (response: any) => {
        console.log('Account deletion initiation successful');
        if (response.data && response.data.validation_key) {
          this.validationKey = response.data.validation_key;
          // this.deleteTimeService.validationKey = response.data.validation_key;
          
        }
        this.isOtpVisible = true;
      },
      error => {
        console.error('Error initiating account deletion:', error);
      }
    );
  }

  closeAccount() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const requestBody = {
      type: 'VERIFY_OTP',
      validation_key: this.validationKey,
      email_otp: this.loginForm.get('emailOtp')?.value || '',
      phone_otp: this.loginForm.get('phoneOtp')?.value || ''
    };
    
    // Verifying OTP and delaying fetching user details
    this.http.delete(`${environment.endpoints.secureBaseURL}/profile`, { headers, body: requestBody }).subscribe(
      () => {
        console.log('Account deletion successful');
        // Delay fetching user details and status by 10 seconds
        setTimeout(() => {
          // Fetching user details after 10 seconds delay
          this.http.get(`${environment.endpoints.secureBaseURL}/profile`).subscribe(
            (response: any) => {
              console.log('User details:', response);
              this.userDetails = response;
              console.log('Details of user:', this.userDetails);
              
              // Log the status to verify if it's correct
              console.log('User status:', this.userDetails.data.status);
              
              if (this.userDetails.data.status === 'INACTIVE') {
                console.log('Status is inactive. Navigating...');
                // Navigate to the revert-delete component
                this.router.navigate(['/subscriber/revert-delete'],
                {
                  state: {
                    validationKey: this.validationKey,
                    emailOtp: this.loginForm.get('emailOtp')?.value || '',
                    phoneOtp: this.loginForm.get('phoneOtp')?.value || ''
                  }
                });
                
              } else {
                console.log('Status is active.');
                // Set isDeleted flag to true
                this.isDeleted = true;
              }
            },
            error => {
              console.error('Error fetching user details:', error);
            }
          );
        }, 10000); // 10 seconds delay
      },
      error => {
        console.error('Error deleting account:', error);
      }
    );
  }
  cancelDeletion() {
    this.loginForm.reset();
    this.isOtpVisible = false;
  }
  revertDelete() {
    this.isDeleted = false;
    this.router.navigate(['/homepage']);
  }
}
