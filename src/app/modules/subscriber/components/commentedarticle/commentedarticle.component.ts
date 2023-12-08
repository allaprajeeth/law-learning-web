import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-commentedarticle',
  templateUrl: './commentedarticle.component.html',
  styleUrls: ['./commentedarticle.component.scss']
})
export class CommentedarticleComponent {
  article: any; 

  constructor(private route: ActivatedRoute, private router:Router, private location:Location) {}
  
  articles = [
    
     {  id: 5,
      title: '"The Common Law "',
      // views: 810, 
    author:'Zoe Kaplan',
    reviewer:'Jeanine Skowronski',  
    editor:'Emily Courtney', 
     content: 'A midst the whirl of commentary about how the U.S. Supreme Court has become increasingly textualist and what precise shape modern textualism should take, the Court’s continued reliance on one decidedly atextual interpretive tool has gone largely unnoticed — the common law.  ',
     heading:'Common Law Definition',
     explanation: [
      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
      "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
     
    ],
    subheading:'Common Law Application',
    description: [
     "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
     "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
     "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
     "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
     "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
   ],
   reviewercomments:'Avoid long words and convoluted language in your document and follow traditional grammar rules.',
   admincomments:'Use transitional words to ensure to connect and relate ideas and Ensure that the information within each sentence is clear.',
 
     },
 

  ];
  goBack() {
    this.location.back();
  }


}
