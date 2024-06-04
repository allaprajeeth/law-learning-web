import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/models/course.model';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  
  course: Course | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient , 

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
     console.log("subscriber",params )
    }
  )
}}



