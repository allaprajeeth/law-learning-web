
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  reviewer: string; 
  editor:string;
  content: string;
  heading:string;
  explanation:string[];
  subheading:string;
  description:string[];
  date: string;
  views: number;
}

@Component({
  selector: 'app-sharedpostdetails',
  templateUrl: './sharedpostdetails.component.html',
  styleUrls: ['./sharedpostdetails.component.scss']
})
export class SharedpostdetailsComponent {
  blogPost: BlogPost | undefined;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private location: Location) { }

 ngOnInit() {
   // Extract the blog post object from the route parameters
   this.route.queryParams.subscribe(params => {
     const postId = params['postId'];
     this.blogPost = JSON.parse(decodeURIComponent(postId));
     
   });
 }
 goBack() {
  this.location.back();
}
}

















// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { Location } from '@angular/common';

// interface BlogPost {
//   id: number;
//   title: string;
//   author: string;
//   reviewer: string; 
//   editor:string;
//   content: string;
//   heading:string;
//   explanation:string[];
//   subheading:string;
//   description:string[];
//   date: string;
//   views: number;
// }

// @Component({
//   selector: 'app-sharedpostdetails',
//   templateUrl: './sharedpostdetails.component.html',
//   styleUrls: ['./sharedpostdetails.component.scss']
// })
// export class SharedpostdetailsComponent {
//   blogPost: BlogPost | undefined;

//   constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private location: Location) { }

//  ngOnInit() {
//    // Extract the blog post object from the route parameters
//    this.route.queryParams.subscribe(params => {
//      const postId = params['postId'];
//      this.blogPost = JSON.parse(decodeURIComponent(postId));
     
//    });
//  }
//  goBack() {
//   this.location.back();
// }
// }
