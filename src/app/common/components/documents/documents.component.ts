import { Component } from '@angular/core';
import { PdfService } from 'src/app/sharedService.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {



  


//   pdfFiles = [
    
//     "https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf",
//     "https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf",
//     "https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y",
//  "https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf",
//  "https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf",
//     "https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf",
//     "https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y",
//  "https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf",
//  "https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf",

 
 
//   ];


  openFile(pdfUrl: string) {
    window.open(pdfUrl, '_blank');
  }
}
