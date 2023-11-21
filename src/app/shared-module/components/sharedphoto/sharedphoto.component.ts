import { Component } from '@angular/core';

@Component({
  selector: 'app-sharedphoto',
  templateUrl: './sharedphoto.component.html',
  styleUrls: ['./sharedphoto.component.scss']
})
export class SharedphotoComponent {
  imageUrl: string = 'https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_960_720.png';
  selectedFileName: string = 'No file selected';

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      this.selectedFileName = selectedFile.name;

      // Update image source
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      this.selectedFileName = 'No file selected';
      this.imageUrl = 'https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_960_720.png';
    }
  }
}
