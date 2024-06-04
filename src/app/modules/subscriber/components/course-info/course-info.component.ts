import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { Course } from 'src/app/common/models/course.model';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  

 
  
  


  course: Course | undefined ;
  

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient , 

  ) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {
    const params = paramMap.get('id');
    this.course = history.state.course.data;
    console.log("subscriber", params, this.course);
  });
}

  
  
}






