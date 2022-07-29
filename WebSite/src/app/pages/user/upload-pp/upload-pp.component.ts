import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';
import { TokenStorageService } from 'src/app/services/token-storage.service';

const URL = 'http://localhost:4000/api/user/profile_picture/upload';

@Component({
  selector: 'app-upload-pp',
  templateUrl: './upload-pp.component.html',
  styleUrls: ['./upload-pp.component.scss']
})
export class UploadPpComponent implements OnInit {
  public uploader!: FileUploader;
  public hasBaseDropZoneOver!: boolean;
  public response!: string;

  public httpOptions = {
    headers: new HttpHeaders({
      "authorization": "Bearer " + this.tokenStorageService.getToken() || '',
      "Content-Type": "application/json"
    }),
  };

  constructor (
    private _snackBar: MatSnackBar,
    private tokenStorageService: TokenStorageService
  ) {
    this.uploader = new FileUploader({
      url: URL,
      method: 'POST',
      itemAlias: 'photo',
      allowedFileType: ['image'],
      allowedMimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      maxFileSize: 100 * 1024 * 1024,
      queueLimit: 10,
      removeAfterUpload: true,
      headers: [
        {name: 'authorization', value: 'Bearer ' + this.tokenStorageService.getToken() || ''}
      ],
    });
    this.hasBaseDropZoneOver = false;
    this.response = '';
    this.uploader.response.subscribe();
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      if (status === 200) {
        this.response = response;
        this._snackBar.open('Image enregistré', 'Fermer', {
          duration: 5000
        });
        window.location.reload();
      } else {
        this._snackBar.open('Erreur: ' + response, 'Fermer', {
          duration: 5000
        });
      };
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public returnLightOrDark() {
    return this.isDarkThemeSelected() ? 'dark-bg' : 'light-bg';
  }

  public isDarkThemeSelected() {
    return (localStorage.getItem('darkTheme') || '') === 'dark-';
  }
}
