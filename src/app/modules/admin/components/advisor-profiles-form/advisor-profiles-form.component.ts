import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { endPoints } from 'src/app/common/constants/endpoints';

@Component({
  selector: 'app-advisor-profiles-form',
  templateUrl: './advisor-profiles-form.component.html',
  styleUrls: ['./advisor-profiles-form.component.scss']
})
export class AdvisorProfilesFormComponent {
  userForm!: FormGroup;
  isDisabled = true; 
  selectedValue: string | undefined; 
  constructor(private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  ngOnInit(): void { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      about: ['', Validators.required],
      selectedValue:[true],
      submitEnabled: [false] 
    });
    this.userForm.valueChanges.subscribe(() => {
      // Check if the required fields are filled
      const nameControl = this.userForm.get('name');
      const roleControl = this.userForm.get('role');
      const aboutControl = this.userForm.get('about');
      if (nameControl && roleControl && aboutControl && nameControl.valid && roleControl.valid && aboutControl.valid) {
        this.userForm.controls['submitEnabled'].setValue(true);
      } else {
        this.userForm.controls['submitEnabled'].setValue(false);
      }
    });
  }

  // onSubmit() {
  //   this.snackBar.open('Details saved successfully!', 'Close', {
  //     duration: 3000,
  //     verticalPosition: 'top' 
  //   });
 
  // }

  
  handleValueChange(event: any) {
    if(event && event.target && event.target.value) {
      this.selectedValue = event.target.value;
      console.log('Selected value:', this.selectedValue);
    }
  }
 
  get name() {
    return this.userForm.get('name');
  }
  get role() {
    return this.userForm.get('role');
  }
  get about() {
    return this.userForm.get('about');
  }


  onSubmit(): void {
    const name=this.name?.value;
    const jobTitle=this.role?.value;
    const about=this.about?.value; 
    const formData={
      name,
      jobTitle,
      about ,
      enabled:true
    }
    const apiUrl = endPoints.baseURL + '/secure/advisor';
      this.http.post(apiUrl , formData)
        .subscribe(
          (response) => {
            this.userForm.reset();
            // You can handle success response here
          },
          (error) => {
            console.error('Error submitting form:', error);
            
          }
        );
        }

      }




