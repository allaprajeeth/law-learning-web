import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-statusarticlepage',
  templateUrl: './statusarticlepage.component.html',
  styleUrls: ['./statusarticlepage.component.scss']
})
export class StatusarticlepageComponent {
  article: any; 
  // location: any;

  constructor(private route: ActivatedRoute, private router:Router, private location: Location) {}
  
  articles = [
    {  id: 1,
      title: '"What Is Criminal Law"',
      views: 810, 
    author:'Zoe Kaplan',
    reviewer:'Jeanine Skowronski',  
    editor:'Emily Courtney', 
     content: 'You may know shows like Law & Order, The Practice, and Better Call Saul for their intense, high-stress, and sometimes emotional scenes, but they’re based on a very real career path in criminal law. So, what is criminal law, and is it as dramatic and extreme as these shows make it out to be?  ',
     heading:'Criminal Law Definition',
     explanation: [
      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
      "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
     
    ],
    subheading:'Criminal Law Definition',
    description: [
     "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
     "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
     "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
     "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
     "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
   ],

  date: '02 Nov 2023',
  },
     
  ];

  goBack() {
    this.location.back();
  }

 


  // ngOnInit(): void {
  //   // Retrieve the article title from the route parameters
  //   const articleTitle = this.route.snapshot.paramMap.get('title');

  //   // Find the article with the matching title
  //   this.article = this.articles.find((a) => a.title === articleTitle);
  // }
}