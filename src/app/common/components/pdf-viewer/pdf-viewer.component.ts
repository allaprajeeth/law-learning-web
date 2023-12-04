import {  Component, } from '@angular/core';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],

})
export class PdfViewerComponent {
  
  downloadPdf(): void {
    const link = document.createElement('a');
    link.href = 'https://www.istockphoto.com/photo/beautiful-sunrise-bursting-through-the-eucalyptus-trees-as-it-rises-over-a-mountain-gm1455965102-491142197?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&utm_term=nature';
    link.download = 'CommonLawCivilLawTraditions.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
 
pdfSrc = "https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf";

}
