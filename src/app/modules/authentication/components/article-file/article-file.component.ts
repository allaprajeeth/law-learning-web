import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-file',
  templateUrl: './article-file.component.html',
  styleUrls: ['./article-file.component.scss']
})
export class ArticleFileComponent implements OnInit {
  @Input() fileUrl: string | undefined;
  @Input() fileName: string | undefined;
  
  fileId: number | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fileId = +params['fileId']; // Convert the parameter to a number
    });
  }
}
