import { Component } from '@angular/core';
import { PdfService } from 'src/app/pdf.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  isTestAvailable: boolean;
  constructor(private testService: PdfService) {
    this.isTestAvailable = this.testService.getIsTestAvailable();
  }
}
