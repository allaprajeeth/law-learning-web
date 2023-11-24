import { Component, Input } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';


@Component({
  selector: 'app-shared-certificate',
  templateUrl: './shared-certificate.component.html',
  styleUrls: ['./shared-certificate.component.scss']
})
export class SharedCertificateComponent {

  showCertificate = false;
  // totalProgress=60;
   toggleCertificate() {
     this.showCertificate = !this.showCertificate;
   }
   @ViewChild('certificate', { static: false }) el: ElementRef | undefined;
   @Input() totalProgress: number = 60;
 
   downloadCertificate() {
     if (this.el) {
       const certificateContent = this.el.nativeElement;
       const customWidth = 480; 
       const customHeight = 480; 
       const pdf = new jsPDF('p', 'pt',  [customWidth, customHeight]);
 
       
       html2canvas(certificateContent).then(canvas => {
         
         const imgData = canvas.toDataURL('image/png');
         const imgWidth = 480;
         const imgHeight = (canvas.height * imgWidth) / canvas.width;
         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
 
         
         pdf.save('certificate.pdf');
       });
     }
   }
}
