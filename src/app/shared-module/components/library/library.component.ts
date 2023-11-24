import {  Component } from '@angular/core';
import { Route, Router } from '@angular/router';
interface PdfFile {
  name: string;
  url: string;
}
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],

})
export class LibraryComponent {
 
  constructor(private router:Router) {}
   
  pdfFiles: PdfFile[] = [
    {
      name: "INTRODUCTION TO LAW AND LEGAL REASONING",
      url: "https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf"
    },
    {
      name: "THE SIX LAWS OF LEARNING",
      url: "https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf"
    },
    {
      name: "THE BOOK IN EARLY LEGAL EDUCATION",
      url: "https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y"
    },
  {
    name:"LAW AND LEGAL REASONING EXPLANATION",
    url:"https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf"
  },
  {
    name:"THE COMMON LAW AND CIVIL LAW TRADITIONS",
    url:"https://www.uncfsu.edu/assets/Documents/College%20of%20Business%20and%20Economics/legal.pdf"
  },
  {
    name:"THE SIX LAWS OF LEARNING",
    url:"https://medicine.hofstra.edu/pdf/faculty/facdev/facdev_sixlaws_oflearning.pdf"
  },
  {
    name:"THE BOOK IN EARLY LEGAL EDUCATION",
    url:"https://openyls.law.yale.edu/bitstream/handle/20.500.13051/178/Learning_the_Law_catalog__reduced.pdf?sequence=2&isAllowed=y"
  },
  {
    name:"THE BOOK IN EARLY LEGAL EDUCATION",
    url:"https://www.lawspice.com/webresources/webworld/pdf/Futura%20BK%20BT.pdf"
  },
  {
    name:"THE COMMON LAW AND CIVIL LAW TRADITIONS",
    url:"https://www.law.berkeley.edu/wp-content/uploads/2017/11/CommonLawCivilLawTraditions.pdf"
  },
  ];
  // openFile(pdfFileIndex: number): void {
  //   const selectedPdf = this.pdfFiles[pdfFileIndex];
  //   this.router.navigate(['/pdf-viewer']);

  // }

  openFile(pdfFileIndex: number): void {
    const selectedPdf = this.pdfFiles[pdfFileIndex];
    this.router.navigate(['/pdf-viewer'], { queryParams: { src: selectedPdf.url } });
    
  }
}
