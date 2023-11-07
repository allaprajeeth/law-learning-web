import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  // postId!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.postId = +params['postId']; // '+' is used to convert postId to a number
  //     // Load content based on postId here
  //   });
  }

 

