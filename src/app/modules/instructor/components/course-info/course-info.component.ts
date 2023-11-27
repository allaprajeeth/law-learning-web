import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit{
  headings: string[] = [];

  constructor(private modelService: ModalService) {}

  ngOnInit() {
    this.modelService.currentExpanded.subscribe((headings) => {
      this.headings = headings;
    });
  }
}
