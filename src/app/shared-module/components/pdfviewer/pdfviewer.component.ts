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
  forceDownload(blob:any, filename:any) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
   downloadResource(e:any) {
    e.preventDefault();
    if (this.pdfSrc) {
    let url = this.pdfSrc;
    let filename = url.split('\\').pop()?.split('/').pop();


    fetch(url, {
      headers: new Headers({
        'Origin': location.origin
      }),
      mode: 'cors'
    })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        this.forceDownload(blobUrl, filename);
      })
      .catch(e => console.error(e));
  }
}
  
}
