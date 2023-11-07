import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
}

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit{

  // blogPost: BlogPost | undefined;

  // constructor(private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const blogPostString = params['postId'];
  //     if (blogPostString) {
  //       this.blogPost = JSON.parse(decodeURIComponent(blogPostString));
  //     }
  //   });
  // }

  blogPost: BlogPost | undefined;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Extract the blog post object from the route parameters
    this.route.queryParams.subscribe(params => {
      const postId = params['postId'];
      this.blogPost = JSON.parse(decodeURIComponent(postId));
      
    });
  }

}
