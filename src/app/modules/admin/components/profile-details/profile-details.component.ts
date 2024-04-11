import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endPoints } from 'src/app/common/constants/endpoints';
import {UserProfile  } from 'src/app/common/models/instructor.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  showcredentialStatus: boolean = true;
  allProfiles:UserProfile [] = [];
  userId  :number| undefined
  s3BaseURL='https://elearning-stagging.s3.ap-south-1.amazonaws.com/'
  user: any;// Replace 'any' with your user model/interface

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      this.userId = +params!;
      if (this.userId) {
        this.fetchAllProfiles(this.userId);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/admin/all-profiles']); // Replace with the appropriate route
  }

  
  fetchAllProfiles(userIdToFetch:number){
    const baseUrl = endPoints.secureBaseURL;
    const apiUrl = baseUrl + `/admin/user-profile/getAll`;
    const params = new HttpParams()
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (userIdToFetch) {

        this.allProfiles = response.data.content.filter((profile: { id: number; }) => profile.id === userIdToFetch);
      }
    });
  }
  


}
