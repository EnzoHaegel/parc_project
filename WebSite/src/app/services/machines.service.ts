import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'globals';
import { TokenStorageService } from './token-storage.service';
import { MapperService } from './mapper.service';
import { map, Observable } from 'rxjs';
import { IMachine, IMachines } from '../models/IMachines';

const MACHINES_API = API_URL + "/machines";

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  public httpOptions = {
    headers: new HttpHeaders({
      "authorization": "Bearer " + this.tokenStorageService.getToken() || ''
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  public getAllMachines(): Observable<IMachine[]> {
    return this.http.get(
      MACHINES_API + "/",
      this.httpOptions
    ).pipe(
      map((data: any) => MapperService.MapMachinesArray(data.data))
    );
  }

  public getMachine(id: number): Observable<IMachine> {
    return this.http.get(
      MACHINES_API + "/?id=" + id,
      this.httpOptions
    ).pipe(
      map((data: any) => MapperService.MapMachine(data))
    );
  }
}
