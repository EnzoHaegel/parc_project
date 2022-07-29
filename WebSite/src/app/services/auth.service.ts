import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenStorageService } from "./token-storage.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { API_URL } from "globals";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

const AUTH_API = API_URL + "/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar
  ) { }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + "login",
      {
        username: username,
        password: password,
      },
      httpOptions
    );
  }

  public register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + "register",
      {
        username: username,
        email: email,
        password: password,
      },
      httpOptions
    );
  }

  public isLogged() {
    // return true;

    return Object.keys(this.tokenStorage.getUser()).length != 0
  }
}
