import { Component, Input } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  showCertificate = false;
  // totalProgress=60;
   toggleCertificate() {
     this.showCertificate = !this.showCertificate;
   }
   @ViewChild('certificate', { static: false }) el: ElementRef | undefined;
   @Input() totalProgress: number = 80;
 
   downloadCertificate() {
     if (this.el) {
       const certificateContent = this.el.nativeElement;
       const customWidth = 480; // Width in millimeters
 const customHeight = 480; 
       // Create a new jsPDF instance
       const pdf = new jsPDF('p', 'pt',  [customWidth, customHeight]);
 
       // Convert the certificate section to a canvas
       html2canvas(certificateContent).then(canvas => {
         // Add the canvas to the PDF
         const imgData = canvas.toDataURL('image/png');
         const imgWidth = 480;
         const imgHeight = (canvas.height * imgWidth) / canvas.width;
         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
 
         // Save the PDF
         pdf.save('certificate.pdf');
       });
     }
   }
}
