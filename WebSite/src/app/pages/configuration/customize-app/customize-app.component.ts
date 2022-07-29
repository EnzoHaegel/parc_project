import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';
import { TokenStorageService } from 'src/app/services/token-storage.service';

const URL = 'http://localhost:4000/api/application/logo/upload';

@Component({
  selector: 'app-customize-app',
  templateUrl: './customize-app.component.html',
  styleUrls: ['./customize-app.component.scss']
})
export class CustomizeAppComponent implements OnInit {
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
      itemAlias: 'logo',
      allowedFileType: ['image'],
      allowedMimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      maxFileSize: 100 * 1024 * 1024,
      queueLimit: 1,
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
      if (status === 200) {
        this.response = response;
        this._snackBar.open('Image enregistré', 'Fermer', {
          duration: 5000
        });
        window.location.reload();
      } else {
        //snackbar with error and warn color
        this._snackBar.open('Erreur, impossible de mettre une image' , 'Fermer', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn']
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
