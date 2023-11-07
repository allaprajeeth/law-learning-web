import { Component } from '@angular/core';

@Component({
  selector: 'app-subdocuments',
  templateUrl: './subdocuments.component.html',
  styleUrls: ['./subdocuments.component.scss']
})
export class SubdocumentsComponent {

  


  pdfFiles = [
    
    "https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf",
    "https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf",
    "https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y",
 "https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf",
 "https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf",
    "https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf",
    "https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y",
 "https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf",
 "https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf",

 
 
  ];
  openFile(pdfUrl: string) {
    window.open(pdfUrl, '_blank');
  }

}
