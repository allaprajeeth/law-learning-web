import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Renderer2, ElementRef } from '@angular/core';
interface BlogPost {
  // Define the properties of a blog post here
  title: string;
  content: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  boxes: BlogPost[] = [
    { title: '"The Importance of Legal Internships: Gaining Practical Experience in Law"',
     content: 'Detail the significance of internships in the legal field. Provide tips on how to secure internships, how to make the most out of internship experiences, and how internships can shape a legal career' },
    { title: '"Mastering Legal Research: A Guide for Law Students and Professionals"',
     content: "Explain the importance of legal research skills. Provide an overview of various research methods, online legal databases, and how to critically analyze legal sources. Include practical examples to enhance understanding." },
     { title: '"Preparing for Law School Applications: Dos and Donts "', 
     content: "Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews." },
     { title: '"Legal Ethics: A Cornerstone of the Legal Profession"',
      content: "Discuss the importance of ethics in the legal field. Cover topics such as client confidentiality, conflicts of interest, and maintaining professional integrity. Highlight real-life examples of ethical dilemmas faced by lawyers." },
     { title: '"The Role of Technology in the Legal Industry: Adapting to the Digital Age"',
      content: "Explore how technology is transforming the legal profession. Discuss legal tech tools, online legal research platforms, and the impact of artificial intelligence on legal practices. Address the importance of tech literacy for future lawyers." },
      { title: '"The Importance of Legal Internships: Gaining Practical Experience in Law"',
      content: 'Detail the significance of internships in the legal field. Provide tips on how to secure internships, how to make the most out of internship experiences, and how internships can shape a legal career' },
  ];

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

  
}




















  // showUserInfo = false;
  // articleForm: FormGroup;
  // userEntries: any[] = [];
  // formSubmitted = false;
  // containerStyles: { [key: string]: string } = {};

  // constructor(
  //   private fb: FormBuilder,
  //   private renderer: Renderer2,
  //   private el: ElementRef
  // ) {
  //   this.articleForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     description: ['', Validators.required],
  //   });
  // }

  // containerHeight: number = 0;

  // onFormSubmit() {
  //   if (this.articleForm.valid) {
  //     this.showUserInfo = true;

  //     const newUserEntry = {
  //       name: this.articleForm.get('name')?.value,
  //       // email: this.articleForm.get('email')?.value,
  //       description: this.articleForm.get('description')?.value,
  //     };
  //     this.userEntries.push(newUserEntry);

  //     this.containerHeight = this.userEntries.length * 27;
  //     this.articleForm.reset();
  //     this.formSubmitted = false;
  //   }
  // }

