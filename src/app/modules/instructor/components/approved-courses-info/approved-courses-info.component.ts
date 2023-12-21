import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-approved-courses-info',
  templateUrl: './approved-courses-info.component.html',
  styleUrls: ['./approved-courses-info.component.scss']
})
export class ApprovedCoursesInfoComponent implements OnInit {
  headings: string[] = [];
  isCheckboxChecked1: boolean = false;
  isCheckboxChecked2: boolean = false;
  isCheckboxChecked3: boolean = false;

  commentClass1: string = 'comments';
  commentClass2: string = 'comments';
  commentClass3: string = 'comments';

  constructor(private modelService: ModalService) {}

  ngOnInit() {
    this.modelService.currentExpanded.subscribe((headings) => {
      this.headings = headings;
    });
  }

  toggleColor(section: number) {
    switch (section) {
      case 1:
        this.commentClass1 = this.isCheckboxChecked1 ? 'comments-checked' : 'comments';
        break;
      case 2:
        this.commentClass2 = this.isCheckboxChecked2 ? 'comments-checked' : 'comments';
        break;
      case 3:
        this.commentClass3 = this.isCheckboxChecked3 ? 'comments-checked' : 'comments';
        break;
    }
  }

  toggleClass1() {
    return this.isCheckboxChecked1 ? 'textcolor' : '';
  }

  toggleClass2() {
    return this.isCheckboxChecked2 ? 'textcolor' : '';
  }

  toggleClass3() {
    return this.isCheckboxChecked3 ? 'textcolor' : '';
  }
}
