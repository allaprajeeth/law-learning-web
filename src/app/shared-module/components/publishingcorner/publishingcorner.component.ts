import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { ArticleApiResponse } from '../fetcharticle.model';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';

@Component({
  selector: 'app-publishingcorner',
  templateUrl: './publishingcorner.component.html',
  styleUrls: ['./publishingcorner.component.scss']
})
export class PublishingcornerComponent implements OnInit {
  articles: ArticleApiResponse[] = [];
  filteredArticles: ArticleApiResponse[] = [];
  searchTerm: string = '';
  isVisible: boolean = false;

  userRole :string|undefined

  constructor(
    private fetcharticleService: FetcharticlesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.loadPublishArticles();
    this.checkRoute();

   

      this.userDetailsService.getUserInfoFromLocalStorage();
      this.userRole = this.userDetailsService.role;
      
    
  }

  loadPublishArticles(): void {
    this.fetcharticleService.loadPublishArticles().subscribe(
      (response: any) => {
        this.articles = response.data.content || [];
        this.filteredArticles = [...this.articles];
        console.log(this.articles);
      },
      (error) => {
        // Handle error if needed
      }
    );
  }
  checkRoute() {
    // Get the first part of the path ('subscriber' or 'instructor')
    const firstPathSegment = this.router.url.split('/')[1];
    // Set visibility based on the path
    this.isVisible = ['subscriber', 'instructor', 'article'].includes(firstPathSegment);

    // this.router.navigate(['/subscriber/articleform']);
  }

  // navigateToArticleForm(): void {
  //   this.router.navigate(['/subscriber/article-form']);
  // }
  
  

  isArticleRoute(): boolean {
    // Check if the current route is exactly 'article'
    return this.router.url === '/article';
  }
  
  searchArticles(): void {
    this.filteredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  navigateToArticleDetail(articleId: number): void {
    console.log('Selected Article ID:', articleId);
  
    // Get the current URL
    const currentUrl = this.router.url;
  
    // Determine the route prefix based on the current URL
    let routePrefix = '/subscriber/publish-articles';
    if (currentUrl.includes('/admin/article')) {
      routePrefix = '/admin/publish-articles';
    } else if (currentUrl.includes('/instructor/article')) {
      routePrefix = '/instructor/publish-articles';
    }else if (currentUrl.includes('/authentication/article')) {
      routePrefix = '/authentication/publish-articles';
    }else if (currentUrl.includes('/reviewer/article')) {
      routePrefix = '/reviewer/publish-articles';
    }else if (currentUrl.includes('/article')){
      routePrefix = '/publish-articles';
    }

    // Navigate using the dynamically constructed route
    this.router.navigate([routePrefix, articleId]);
  }




  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToArticleForm(): void {
    // Check the current URL to determine the appropriate destination
    const currentUrl = this.router.url;
  
    if (currentUrl.includes('/subscriber/article')) {
      // If the current URL contains '/subscriber/article', navigate to '/subscriber/articleform'
      this.router.navigateByUrl('/subscriber/article-form');
    } else if (currentUrl.includes('instructor/article')){
      // Otherwise, navigate to a default destination or handle it based on your requirements
      // For example:
      this.router.navigateByUrl('/instructor/articleform');
    }
  }
  matchesBaseUrl(): any {
    // Check if the base URL is '/article'
    return this.router.url === '/article';
    
    
    
  }
}




  // openArticleInNewTab(article: ArticleApiResponse): void {
  //   // Get the current route
  //   const currentRoute = this.router.url;
  
  //   // Define the base route for post details
  //   let postDetailRoute: string;
  
  //   // Determine the base route based on the current route
  //   if (currentRoute.startsWith('/article')) {
  //     postDetailRoute = '/post'; // If the current route is "/article", use "/post"
  //   } else if (currentRoute.startsWith('/subscriber/article')) {
  //     postDetailRoute = '/subscriber/post'; // If the current route is "/subscriber/article", use "/subscriber/post"
  //   } else if (currentRoute.startsWith('/instructor/article')) {
  //     postDetailRoute = '/instructor/post'; // If the current route is "/instructor/article", use "/instructor/post"
  //   } else if (currentRoute.startsWith('/admin/article')) {
  //     postDetailRoute = '/admin/post';
  //   } else {
  //     postDetailRoute = '/post'; // Fallback to "/post" if the current route doesn't match the specified cases
  //   }
  
  //   // Assuming ArticleApiResponse has a property named 'data' which contains an 'id' property
  //   const postDetailUrl = `${postDetailRoute}/${article.data.id}`;
  
  //   // Navigate to the blog post details page
  //   this.router.navigate([postDetailUrl]);
  // }
  
    // navigateToLogin(){
    //   this.router.navigate(['/login']);
    // }
    
    
  






















































// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog'; 
// import { ActivatedRoute, Router } from '@angular/router';




// interface BlogPost {
//   id: number;
//   title: string;
//   views: number;
//   author: string;
//   reviewer: string; 
//   editor:string;
//   content: string;
//   heading:string;
//   explanation: string[];
//   subheading:string;
//   description: string[];
//   date: string;
   
// }

// @Component({
//   selector: 'app-publishingcorner',
//   templateUrl: './publishingcorner.component.html',
//   styleUrls: ['./publishingcorner.component.scss']
// })
// export class PublishingcornerComponent {
//   noResults: boolean = false;

//   boxes: BlogPost[] = [
//     {  id: 1,
//       title: '"What Is Criminal Law"',
//       views: 810, 
//     author:'Zoe Kaplan',
//     reviewer:'Jeanine Skowronski',  
//     editor:'Emily Courtney', 
//      content: 'You may know shows like Law & Order, The Practice, and Better Call Saul for their intense, high-stress, and sometimes emotional scenes, but they’re based on a very real career path in criminal law. So, what is criminal law, and is it as dramatic and extreme as these shows make it out to be?  ',
//      heading:'Criminal Law Definition',
//      explanation: [
//       "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
//       "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
//       "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
//       "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
//       "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
     
//     ],
//     subheading:'Criminal Law Definition',
//     description: [
//      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
//      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
//      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
//      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
//      "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
//    ],

//   date: '02 Nov 2023',
//      },
//     { id: 2,
//        title: '"Mastering Legal Research:"',
//        views: 630, 
//     author:'John Smith',
//     reviewer:'Williams',
//     editor:'john shi',
//     content: "Explain the importance of legal research skills. Provide an overview of various research methods, online legal databases, and how to critically analyze legal sources. Include practical examples to enhance understanding.",
//     heading:'Legal Research',
//     explanation: [
//       'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
//        'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
//     ],
//     subheading:'importance of legal research skills.',
//     description: [
//      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
//      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
//      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
//      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
//      "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
//    ],
//     date: '01 Nov 2023',
//   },
     
//     {  id: 3,
//       title: '"Law School Applications:"', 
//       views: 355, 
//      author:'John Smith',
//      reviewer:'William john',
//      editor:'john',
//      content: "Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews.Offer a step-by-step.",
//      heading:'Applications:',
//      explanation: [
//       'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
//        'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
//     ],
//     subheading:'Law School  Definition',
//     description: [
//      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
//      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
//      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
//      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
//      "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
//    ],
//      date: '30 Oct 2023',

//     },
    
//      {  id: 4,
//       title: '"Legal Ethics:Legal Profession"',
//       views: 610, 
//      author:'David Wilson',
//      reviewer:'John smith',
//      editor:'Wilson',
//      content: "Discuss the importance of ethics in the legal field. Cover topics such as client confidentiality, conflicts of interest, and maintaining professional integrity. Highlight real-life examples of ethical dilemmas faced by lawyers.",
//      heading:'Legal Profession',
//      explanation: [
//       'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
//        'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
//     ],subheading:'Criminal Law Definition',
//     description: [
//      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
//      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
//      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
//      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
//      "A degree in law (Juris Doctor or equivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
//    ],
//      date: '14 Oct 2023',
//     },
    
//      {  id: 5,
//       title: '"Legal Industry:Digital Age"',
//       views: 925, 
//      author:'John Smith', 
//      reviewer:'Williams',
//      editor:'Antony',
//      content: "Explore how technology is transforming the legal profession. Discuss legal tech tools, online legal research platforms, and the impact of artificial intelligence on legal practices. Address the importance of tech literacy for future lawyers.",
//      heading:'Digital Age"',
//      explanation: [
//       'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
//        'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',
     
//     ],
//     subheading:'Legal Industry',
//     description: [
//      "A Law Learning Instructor is responsible for delivering high-quality instruction and guidance to individuals or groups seeking to expand their knowledge of legal principles and concepts. They play a crucial role in facilitating the learning process, helping students understand the complexities of the legal field, and preparing them for success in their legal studies or careers.",
//      "Develop and deliver instructional materials, including lectures, workshops, and presentations, on various aspects of the law. Adapt teaching methods and content to accommodate various learning styles and levels of expertise.",
//      "Create and update curriculum content, including lesson plans, reading materials, and assessment tools. Ensure that curriculum aligns with the latest legal developments and standards.",
//      "Foster a positive learning environment by encouraging active participation and critical thinking. Provide constructive feedback and support to students, addressing their questions and concerns.",
//      "A degree in law (Juris Doctor or equFivalent) is required. Relevant teaching or instructional experience is preferred. Strong knowledge of legal principles, ethics, and case studies. Excellent communication and presentation skills. Patience, adaptability, and the ability to motivate and engage learners. A commitment to ongoing professional development in the legal field."
    
//    ],
//      date: '25 Apr 2023',

//     },
//      {  id: 6,
//       title: '"Legal Internships:Experience"',
//       views: 738, 
//       author:'Williams',
//       reviewer:'',
//       editor:'Antony',
//       content: 'Detail the significance of internships in the legal field. Provide tips on how to secure internships, how to make the most out of internship experiences, and how internships can shape a legal career' ,
//       heading:'',
//       explanation: [
//         'Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson. Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.Criminal law is an area of the law that concerns crimes and laws applied to those who commit them. There are two main types of criminal law offenses: felonies and misdemeanors. The most serious crimes are felonies, which include offenses like murder, robbery, and arson.',
//          'Misdemeanors are more minor offenses, like traffic violations or petty thefts. According to the FBI, the most common crimes are larceny (theft), burglary, and aggravated assault.There are federal criminal laws and state-specific ones. A penalty for a crime depends on what kind of crime you’ve committed, where you committed it, how involved you were with the crime, and whether this is your first criminal offense.',

//       ],
//       subheading:'Criminal Law Job Titles',
//     description: [
//      "To become a criminal lawyer, you’ll need an advanced law degree. First, you must earn an undergraduate degree. There’s no one required degree, but a major in a related field, like criminal justice, can help you learn more about the field with law enforcement, investigations, and court courses. ",
//      "After you complete your bachelor’s degree, you’ll likely have to take the Law School Admission Test (LSAT). Most law schools in the U.S. require this exam. The LSAT tests you on skills you’ll need in law school, including reading comprehension, writing, and analytical skills.",
//      "Once in law school, you’ll take core law courses. Many of these will touch on general criminal law practices. In addition, you can take more specific criminal law courses that may focus on certain types of crime or the politics of criminal law. For example, Columbia Law School offers courses in “Policing the Police” and “Civil Liberties and the Response to Terrorism.”",
//    ],
//       date: '04 Apr 2023',  
//     },
//     ];
//   filteredBoxes: BlogPost[] = [];
//   searchTerm: string = '';
//   isInArticlePage:boolean=false;
//   ngOnInit() {
//     const currentRoute = this.router.url;
//     if (currentRoute === '/article') {
//     this.isInArticlePage=true
//     }
//     this.filteredBoxes = this.boxes;
//   }
//   filterBoxes() {
//     this.filteredBoxes = this.boxes.filter(box => {
//       const authorMatch = box.author.toLowerCase().includes(this.searchTerm.toLowerCase());
//       const titleMatch = box.title.toLowerCase().includes(this.searchTerm.toLowerCase());
//       return authorMatch || titleMatch;
//     });
    
//     this.noResults = this.filteredBoxes.length === 0;
//   }
//   expandedIndex: number = -1;

//   toggleReadMore(index: number) {
//     if (this.expandedIndex === index) {
//       this.expandedIndex = -1;
//     } else {
//       this.expandedIndex = index;
//     this.filteredBoxes[index].views += 1;
//     }

//   }
//   isExpanded(index: number): boolean {
//     return this.expandedIndex === index;
//   }

//   constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }


//   openModal(blogPost: BlogPost): void {
  
//   }

// openSubmitArticleModal() {
//   // Get the current route
//   const currentRoute = this.router.url;
//     // Show an alert if the current route is "/article"
//     if (currentRoute === '/article') {
//       const userResponse = confirm('Login to this website to upload an article. Do you want to proceed?');
//       if (userResponse) {
//         // User clicked "OK" or "Yes"
//         this.router.navigate(['/login']);
//       } else {
//         this.router.navigate(['/article']);
//       }
//     } else {
//       switch (currentRoute) {
//         case '/article':
//           // If in "/article" routing, navigate to "/login" and open dialog
//           this.router.navigate(['/login']).then(() => {
//             // this.openLoginDialog();
//           });
//           break;
//         case '/subscriber/article':
//           // If in "/subscriber/article" routing, navigate to "/subscriber/articleform"
//           this.router.navigate(['/subscriber/articleform']);
//           break;
//         case '/instructor/article':
//           // If in "/instructor/article" routing, navigate to "/instructor/articleform"
//           this.router.navigate(['/instructor/articleform']);
//           break;

//           case '/reviewer/article':
//           this.router.navigate(['/reviewer/articleform']);
//           break;

//           case '/admin/article':
//           this.router.navigate(['/admin/articleform']);
//           break;

//           case '/authentication/article':
//           this.router.navigate(['/authentication/articleform']);
//           break;
//         default:
//           // Default case, navigate to a fallback route or handle as needed
//           break;
//       }
//     }
// }





// // openArticleInNewTab(blogPost: BlogPost): void {
// //   // Construct the URL of the route for displaying blog post details
// //    const postDetailUrl = `/instructor/post/${blogPost.id}`; 
  
// //   // Replace 'post/:id' with your actual route path

// //   // Open the blog post details in a new tab and pass the entire blog post object
// //    window.open(`${postDetailUrl}?postId=${encodeURIComponent(JSON.stringify(blogPost))}`, '_self');
// // }
// openArticleInNewTab(blogPost: BlogPost): void {
//   // Get the current route
//   const currentRoute = this.router.url;

//   // Define the base route for post details
//   let postDetailRoute: string;

//   // Determine the base route based on the current route
//   if (currentRoute.startsWith('/article')) {
//     postDetailRoute = '/post'; // If the current route is "/article", use "/post"
//   } else if (currentRoute.startsWith('/subscriber/article')) {
//     postDetailRoute = '/subscriber/post'; // If the current route is "/subscriber/article", use "/subscriber/post"
//   } else if (currentRoute.startsWith('/instructor/article')) {
//     postDetailRoute = '/instructor/post'; // If the current route is "/instructor/article", use "/instructor/post"
//   } else if (currentRoute.startsWith('/admin/article')){
//     postDetailRoute = '/admin/post';
//   }else {
//     postDetailRoute = '/post'; // Fallback to "/post" if the current route doesn't match the specified cases
//   }

//   // Construct the URL of the route for displaying blog post details
//   const postDetailUrl = `${postDetailRoute}/${blogPost.id}`;

//   // Open the blog post details in a new tab and pass the blog post object as a query parameter
//   window.open(`${postDetailUrl}?postId=${encodeURIComponent(JSON.stringify(blogPost))}`, '_self');
// }
// navigateToLogin(){
//   this.router.navigate(['/login']);
// }



// }
