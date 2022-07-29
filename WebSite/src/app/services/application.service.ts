import { Injectable } from '@angular/core';
import { API_URL } from 'globals';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const APPLICATION_API = API_URL + "/application/";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public httpOptions = {
    headers: new HttpHeaders({
      "authorization": "Bearer " + this.tokenStorageService.getToken() || '',
      "Content-Type": "application/json",
      "responseType": 'blob'
    }),
  };

  public imageToShow: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient,
  ) {}

  public getLogo() {
    return this.http.get(
      APPLICATION_API + "logo",
      this.httpOptions
    )
  }

  public createImageFromBlob(image: Blob): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
    return this.imageToShow;
  }

  public getTheme() {
    return this.http.get(
      APPLICATION_API + "theme"
    )
  }

  public updateTheme(theme: string) {
    return this.http.post(
      APPLICATION_API + "theme",
      { "name": theme },
      this.httpOptions
    )
  }
}
