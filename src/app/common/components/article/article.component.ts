import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ModalComponent } from '../modal/modal.component';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Renderer2, ElementRef } from '@angular/core';
interface BlogPost {
  // Define the properties of a blog post here
  title: string;
  author: string;
  content: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  noResults: boolean = false;

  boxes: BlogPost[] = [
    { title: '"The Legal Internships:"',
    author:'williams',
     content: 'Detail the significance of internships in the legal field. Provide tips on how to secure internships, how to make the most out of internship experiences, and how internships can shape a legal career' },
    { title: '"Mastering Legal Research:"',
    author:'John Smith',
    content: "Explain the importance of legal research skills. Provide an overview of various research methods, online legal databases, and how to critically analyze legal sources. Include practical examples to enhance understanding." },
     { title: '"Law School Applications:"', 
     author:'John Smith',
     content: "Offer a step-by-step guide on preparing law school applications. Include tips on writing compelling personal statements, obtaining strong recommendation letters, and preparing for law school interviews." },
     { title: '"Legal Ethics:Legal Profession"',
     author:'David Wilson',
     content: "Discuss the importance of ethics in the legal field. Cover topics such as client confidentiality, conflicts of interest, and maintaining professional integrity. Highlight real-life examples of ethical dilemmas faced by lawyers." },
     { title: '"Legal Industry:Digital Age"',
     author:'John Smith', 
     content: "Explore how technology is transforming the legal profession. Discuss legal tech tools, online legal research platforms, and the impact of artificial intelligence on legal practices. Address the importance of tech literacy for future lawyers." },
      { title: '" Legal Internships:Experience"',
      author:'williams',
      content: 'Detail the significance of internships in the legal field. Provide tips on how to secure internships, how to make the most out of internship experiences, and how internships can shape a legal career' },
  ];

  filteredBoxes: BlogPost[] = [];
  searchTerm: string = '';

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

  constructor(public dialog: MatDialog) { }


  openModal(blogPost: BlogPost): void {
    this.dialog.open(ModalComponent, {
      width: '400px', // Set the width of the modal as per your design
      data: blogPost // Pass the entire blog post data to the modal
    });
  }


  openSubmitArticleModal() {
  // Implement the logic to open the modal or perform any other action here
}

  }





















  