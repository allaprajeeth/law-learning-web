import { Component, Output, EventEmitter } from '@angular/core';
import { Observable, ObservedValueOf, Observer, from, of } from 'rxjs';
import { concatMap, catchError, take } from 'rxjs/operators';
import { StringIds } from '../../StringIds';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() uploadedFiles: EventEmitter<IUploadedFile> = new EventEmitter();

  constructor() { }

  uploadFiles(event: any): void {
    const files = event?.target?.files;
    const numberOfFiles = files.length;
    from(files)
    .pipe(
      concatMap((file: any) => this.validateFile(file as File).pipe(catchError((error: IUploadedFile) => of(error)))),
      take(numberOfFiles)
    )
    .subscribe((validatedFile: IUploadedFile) => {
      this.uploadedFiles.emit(validatedFile);
    });
  }

  private validateFile(file: File): Observable<IUploadedFile> {
    const fileReader = new FileReader();
    const { type, name } = file;
    return new Observable((observer: Observer<IUploadedFile>) => {
      this.validateSize(file, observer);
      fileReader.readAsDataURL(file);
      fileReader.onload = event => {
        if (this.isImage(type)) {
          const image = new Image();
          image.onload = () => {
            observer.next({ file });
            observer.complete();
          };
          image.onerror = () => {
            observer.error({ error: { name, errorMessage: StringIds.INVALID_FILE_TYPE } });
          };
          image.src = fileReader.result as string;
        } else {
          observer.next({ file });
          observer.complete();
        }
      };
      fileReader.onerror = () => {
        observer.error({ error: { name, errorMessage: StringIds.INVALID_FILE } });
      };
    });
  }

  private isImage(mimeType: string): boolean {
    return mimeType.match(/image\/*/) !== null;
  }

  private validateSize(file: File, observer: Observer<IUploadedFile>): void {
    const { name, size } = file;
    if (!this.isValidSize(size)) {
      observer.error({ error: { name, errorMessage: StringIds.INVALID_FILE_SIZE } });
    }
  }

  private isValidSize(size: number): boolean {
    const toKByte = size / 1024;
    return toKByte >= 5 && toKByte <= 5120;
  }
}

export interface IUploadedFile {
  file?: File;
  error?: IUploadError;
}

export interface IUploadError {
  name: string;
  errorMessage: string;
}