import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],

})
export class PdfViewerComponent {
  // pdfSrc: string | undefined;
  // constructor(private route: ActivatedRoute) {}
  // ngOnInit(): void {

  //   this.route.queryParams.subscribe(params => {
  //     this.pdfSrc = params['src'];
    
  //     console.log('pdfSrc updated:', this.pdfSrc);
  //   });
  // // }
 
  pdfSrc = "https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf";
// }
}
