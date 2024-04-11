import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import { InstructorProfile } from 'src/app/common/models/instructor.model';
import { Course } from 'src/app/common/models/course.model';
import { CourseService } from 'src/app/common/services/course.service';
interface Categories {
  viewValue: string;
}


@Component({
  selector: 'app-instructorinfo',
  templateUrl: './instructorinfo.component.html',
  styleUrls: ['./instructorinfo.component.scss']
})
export class InstructorinfoComponent implements OnInit {
 
  mycoursesimages: string[] = [];
  availablecoursesimages: string[] = [];
  instructorId :number |undefined
  s3BaseURl: string;
  photo='https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient ,
   

  ) {  this.s3BaseURl = endPoints.s3BaseURL;}

 

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      this.instructorId = +params!;
      if (this.instructorId) {
        this.fetchInstructorProfiles(this.instructorId);
        this. fetchInstructorCourses()
      }
    });

   
  }

   

  instructorProfiles: InstructorProfile[] = [];
  instructorCourses: Course[]=[]
  
  fetchInstructorProfiles(instructorIdToFetch?: number): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl = baseUrl + `/instructors/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
      
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (instructorIdToFetch) {
        this.instructorProfiles = response.data.content.filter((profile: { id: number; }) => profile.id === instructorIdToFetch);
      }
    });
  }

  fetchInstructorCourses(): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl = `${baseUrl}/instructor/${this.instructorId }/courses`;
    const params = new HttpParams()
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
      
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (this.instructorId ) {
        this.instructorCourses = response.data.content
        console.log(this.instructorCourses)
      }
    });
  }

  
  onImageError(event: any) {
    event.target.src = 'assets/law.png';
  }


}

