import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.scss']
})
export class ArticleformComponent  implements OnInit {
  articleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.articleForm = this.formBuilder.group({
      name: ['', Validators.required],
      articleName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    // Handle form submission logic here
    if (this.articleForm.valid) {
      // Perform the necessary actions, such as submitting data to a server
      console.log('Form submitted!', this.articleForm.value);
    }
  }
}
