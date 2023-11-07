import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ModalComponent } from 'src/app/common/components/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalserviceService } from 'src/app/common/components/modalservice.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Renderer2, ElementRef } from '@angular/core';
interface BlogPost {
  id: number;
  title: string;
  author: string;
  reviewer: string; 
  editor:string;
  content: string;
  heading:string;
  explanation: string[];
  subheading:string;
  description: string[];
  date: string;
}

@Component({
  selector: 'app-publishingcorner',
  templateUrl: './publishingcorner.component.html',
  styleUrls: ['./publishingcorner.component.scss']
})
export class PublishingcornerComponent {
  noResults: boolean = false;

  boxes: BlogPost[] = [
    {  id: 1,
      title: '"What Is Criminal Law?"',
    author:'Zoe Kaplan',
    reviewer:'Jeanine Skowronski',  
    editor:'Emily Courtney', 
     content: 'You may know shows like Law & Order, The Practice, and Better Call Saul for their intense, high-stress, and sometimes emotional scenes, but they’re based on a very real career path in criminal law. So, what is criminal law, and is it as dramatic and extreme as these shows make it out to be?  ',
     heading:'Criminal Law Definition',
     explanation: [
      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
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

  date: '02 Nov 2023' // Add the date property for the first blog post
     },
    { id: 2,
       title: '"Mastering Legal Research:"',
    author:'John Smith',
    reviewer:'Williams',
    editor:'john shi',
    content: "Explain the importance of legal research skills. Provide an overview of various research methods, online legal databases, and how to critically analyze legal sources. Include practical examples to enhance understanding.",
    heading:'Legal Research',
    explanation: [
      'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
       'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
    ],
    subheading:'importance of legal research skills.',
    description: [
     "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
     "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
     "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
     "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
     "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
   ],
    date: '01 Nov 2023'
  },
     
    {  id: 3,
      title: '"Law School Applications:"', 
     author:'John Smith',
     reviewer:'William john',
     editor:'john',
     content: "Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step.",
     heading:'Applications:',
     explanation: [
      'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
       'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
    ],
    subheading:'Law School  Definition',
    description: [
     "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
     "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
     "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
     "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
     "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
   ],
     date: '30 Oct 2023'
    },
    
     {  id: 4,
      title: '"Legal Ethics:Legal Profession"',
     author:'David Wilson',
     reviewer:'John smith',
     editor:'Wilson',
     content: "Discuss the importance of ethics in the legal field. Cover topics such as client confidentiality, conflicts of interest, and maintaining professional integrity. Highlight real-life examples of ethical dilemmas faced by lawyers.",
     heading:'Legal Profession',
     explanation: [
      'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
       'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
    ],subheading:'Criminal Law Definition',
    description: [
     "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
     "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
     "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
     "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
     "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
   ],
     date: '14 Oct 2023'
    },
    
     {  id: 5,
      title: '"Legal Industry:Digital Age"',
     author:'John Smith', 
     reviewer:'Williams',
     editor:'Antony',
     content: "Explore how technology is transforming the legal profession. Discuss legal tech tools, online legal research platforms, and the impact of artificial intelligence on legal practices. Address the importance of tech literacy for future lawyers.",
     heading:'Digital Age"',
     explanation: [
      'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
       'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
    ],
    subheading:'Legal Industry',
    description: [
     "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
     "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
     "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
     "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
     "A degree in law (Juris Doctor or equFivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
   ],
     date: '25 Apr 2023'
    },
     
     {  id: 6,
      title: '" Legal Internships:Experience"',
      author:'Williams',
      reviewer:'',
      editor:'Antony',
      content: 'Detail the significance of internships in the legal field. Provide tips on how to secure internships, how to make the most out of internship experiences, and how internships can shape a legal career' ,
      heading:'',
      explanation: [
        'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
         'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
       
      ],
      subheading:'Criminal Law Job Titles',
    description: [
     "To become a criminal lawyer, you’ll need an advanced law degree. First, you must earn an undergraduate degree. There’s no one required degree, but a major in a related field, like criminal justice, can help you learn more about the field with law enforcement, investigations, and court courses. ",
     "After you complete your bachelor’s degree, you’ll likely have to take the Law School Admission Test (LSAT). Most law schools in the U.S. require this exam. The LSAT tests you on skills you’ll need in law school, including reading comprehension, writing, and analytical skills.",
     "Once in law school, you’ll take core law courses. Many of these will touch on general criminal law practices. In addition, you can take more specific criminal law courses that may focus on certain types of crime or the politics of criminal law. For example, Columbia Law School offers courses in “Policing the Police” and “Civil Liberties and the Response to Terrorism.”",
    
     
    
   ],
      date: '04 Apr 2023'
    },
 
    ];

  filteredBoxes: BlogPost[] = [];
  searchTerm: string = '';
  // router: any;

  ngOnInit() {
    // Initialize filteredBoxes with all the boxes by default
    this.filteredBoxes = this.boxes;
  }

  filterBoxes() {
    this.filteredBoxes = this.boxes.filter(box => {
      const authorMatch = box.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      const titleMatch = box.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return authorMatch || titleMatch;
    });
    
    // Update the noResults flag based on the filteredBoxes array
    this.noResults = this.filteredBoxes.length === 0;
  }


  expandedIndex: number = -1;

  toggleReadMore(index: number) {
    if (this.expandedIndex === index) {
      this.expandedIndex = -1;
    } else {
      this.expandedIndex = index;
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,private modalService: ModalserviceService) { }


  openModal(blogPost: BlogPost): void {
    this.dialog.open(ModalComponent, {
      width: '800px',
      height: 'auto', // Set the width of the modal as per your design
      data: blogPost // Pass the entire blog post data to the modal
    });
  }


  openSubmitArticleModal() {
  // Implement the logic to open the modal or perform any other action here
}

// openArticleInNewTab(blogPost: BlogPost): void {
//  // Construct the URL of the route for displaying blog post details
//  const postDetailUrl = `/post/${blogPost.id}`; // Replace 'post/:id' with your actual route path

//  // Open the blog post details in a new tab
//  window.open(`${postDetailUrl}?postId=${encodeURIComponent(JSON.stringify(blogPost))}`, '_blank');
// }

openArticleInNewTab(blogPost: BlogPost): void {
  // Construct the URL of the route for displaying blog post details
  const postDetailUrl = `/post/${blogPost.id}`; // Replace 'post/:id' with your actual route path

  // Open the blog post details in a new tab and pass the entire blog post object
  window.open(`${postDetailUrl}?postId=${encodeURIComponent(JSON.stringify(blogPost))}`, '_blank');
}
}
