import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {
  contactForm: FormGroup;
  contactus="/assets/c.png"
  constructor() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/), this.phoneStartsWithValidDigit]),
      message: new FormControl('')
    });
}
 phoneStartsWithValidDigit(control: AbstractControl) {
  const phoneNumber = control.value;
  if (!/^[6-9]/.test(phoneNumber)) {
    return { startsWithInvalidDigit: true };
  }
  return null;
}
}