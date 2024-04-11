import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endPoints } from '../../constants/endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdvisorProfile } from '../../models/instructor.model';
interface Categories {
  viewValue: string;
}
@Component({
  selector: 'app-advisor-details',
  templateUrl: './advisor-details.component.html',
  styleUrls: ['./advisor-details.component.scss'],
})
export class AdvisorDetailsComponent {
  s3BaseURl: string | undefined;
  advisorProfiles:AdvisorProfile[] = [];
  isDescriptionExpanded: boolean = false;
  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) 
  {
    this.s3BaseURl = endPoints.s3BaseURL;
  }
 

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const params = paramMap.get('id');
      const advisorId = +params!;
      if (advisorId) {
        this.fetchAdvisorProfiles(advisorId);
      }
    });
  }

  fetchAdvisorProfiles(advisorIdToFetch?: number): void {
    const baseUrl = endPoints.baseURL;
    const apiUrl = baseUrl + `/advisor/profiles`;
    const params = new HttpParams()
      .set('search', '')
      .set('number', '0')
      .set('size', '20')
      .set('sort', 'id,DESC');
      
    this.http.get<any>(apiUrl, { params }).subscribe(response => {
      if (advisorIdToFetch) {
        
        this.advisorProfiles = response.data.content.filter((profile: { id: number; }) => profile.id === advisorIdToFetch);
      }
    });
  }
}
