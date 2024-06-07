import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/sharedService.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  loginForm!: FormGroup;
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
  
    this.http.delete(`${environment.endpoints.secureBaseURL}/profile`, { headers, body: requestBody }).subscribe(
      () => {
        console.log('Account deletion successful');
        setTimeout(() => {
          this.http.get(`${environment.endpoints.secureBaseURL}/profile`).subscribe(
            (response: any) => {
              console.log('User details:', response);
              this.userDetails = response;
              console.log('Details of user:', this.userDetails);
              console.log('User status:', this.userDetails.data.status);
              
              let revertDeleteRoute: string;
  
              switch (this.userDetails.data.role) {
                case 'SUBSCRIBER':
                  revertDeleteRoute = '/subscriber/revert-delete';
                  break;
                case 'INSTRUCTOR':
                  revertDeleteRoute = '/instructor/revert-delete';
                  break;
                case 'ADMIN':
                  revertDeleteRoute = '/admin/revert-delete';
                  break;
                case 'REVIEWER':
                  revertDeleteRoute = '/reviewer/revert-delete';
                  break;
                case 'CONTENTMANAGER':
                  revertDeleteRoute = '/authentication/revert-delete';
                  break;
                default:
                  // Handle other roles or no role case
                  console.error('Unsupported user role for revert-delete');
                  return;
              }
  
              if (this.userDetails.data.status === 'INACTIVE') {
                console.log('Status is inactive. Navigating...');
                this.router.navigate([revertDeleteRoute], {
                  state: {
                    validationKey: this.validationKey,
                    emailOtp: this.loginForm.get('emailOtp')?.value || '',
                    phoneOtp: this.loginForm.get('phoneOtp')?.value || ''
                  }
                });
                
              } else {
                console.log('Status is active.');
                this.isDeleted = true;
              }
            },
            error => {
              console.error('Error fetching user details:', error);
            }
          );
        }, 2000); 
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
}
