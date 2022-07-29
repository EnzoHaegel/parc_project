import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'globals';
import { map, Observable } from 'rxjs';
import { ILogs, IScript, IScriptList } from '../models/IScripts';
import { MapperService } from './mapper.service';
import { TokenStorageService } from './token-storage.service';

const SCRIPT_API = API_URL + "/script/";

@Injectable({
  providedIn: 'root'
})

export class ScriptsService {

  public httpOptions = {
    headers: new HttpHeaders({
      "authorization": "Bearer " + this.tokenStorageService.getToken() || '',
      "Content-Type": "application/json"
    }),
  };

  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient,
  ) {}

  public getScripts(): Observable<IScriptList> {
    return this.http.get(
      SCRIPT_API,
      this.httpOptions
    ).pipe(
      map((data: any) => MapperService.MapScriptList(data))
    );
  }

  public executeScript(script: string): Observable<IScript> {
    return this.http.post(
      SCRIPT_API + "execute",
      {
        name: script,
      },
      this.httpOptions
    ).pipe(
      map((data: any) => MapperService.MapScript(data))
    );
  }

  public getLogsScripts(): Observable<ILogs[]> {
    return this.http.get(
      SCRIPT_API + "logs",
      this.httpOptions
    ).pipe(
      map((data: any) => MapperService.MapLogs(data.logs))
    );
  }
}
