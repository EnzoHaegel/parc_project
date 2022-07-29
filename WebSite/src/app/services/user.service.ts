import { Injectable } from '@angular/core';
import { API_URL } from 'globals';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MapperService } from './mapper.service';
import { IUser } from '../models/IUser';

const USER_API = API_URL + "/user/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public httpOptions = {
    headers: new HttpHeaders({
      "authorization": "Bearer " + this.tokenStorageService.getToken() || ''
    }),
  };

  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient,
  ) {}

  public isAdmin(): Observable<any> {
    return this.http.get(
      USER_API + "role",
      this.httpOptions
    )
  }

  public getAllUser(): Observable<IUser[]> {
    return this.http.get(
      USER_API + "all",
      this.httpOptions
    ).pipe(
      map((data: any) => MapperService.MapUserList(data.data))
    );
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.post(
      USER_API + "delete",
      {
        username: username,
      },
      this.httpOptions
    )
  }
}
