import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.scss']
})
export class PdfviewerComponent {
  pdfSrc: string | undefined;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Read the query parameter 'src' from the URL
    this.route.queryParams.subscribe(params => {
      this.pdfSrc = params['src'];
      console.log(this.pdfSrc)
    });
  }
  
  
}
