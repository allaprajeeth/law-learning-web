import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface Categories {
  viewValue: string;
}
@Component({
  selector: 'app-advisor-details',
  templateUrl: './advisor-details.component.html',
  styleUrls: ['./advisor-details.component.scss']
})
export class AdvisorDetailsComponent {
  description: string[] = [
    "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
    "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
    "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
    "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
    "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
  ];

  isDescriptionExpanded: boolean = false;

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }


  


  






 

  constructor(
    private route: ActivatedRoute,
    // private searchService: SearchServiceService
  ) {}

  
  
  ngOnInit(): void {
    
  }
    
}
