import { Resolve } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { CreateSoutenance } from '../models/create-soutenance';

const SOUTENANCE_API = 'http://127.0.0.1:3000/soutenance';


@Injectable({
  providedIn: 'root'
})
export class SoutenanceService implements Resolve<any> {

  constructor(private http: HttpClient) { }
  getSoutenances(page : number=1): Observable<any> {
    return this.http.get<any>(SOUTENANCE_API+`?page=${page}`);
  }

  resolve() {
    return this.http.get(SOUTENANCE_API + "/event");
  }

  getSoutenance(id : number): Observable<any> {
    return this.http.get<any>(SOUTENANCE_API+`/${id}`);
  }

  createSoutenance(soutenance: CreateSoutenance) : Observable<any>{
    
    return this.http.post<any>(SOUTENANCE_API,soutenance)
  }
  modifySoutenance(soutenance: Partial<CreateSoutenance>,id:number) : Observable<any>{
    return this.http.put<any>(`${SOUTENANCE_API}/${id}`,soutenance)
  }
  deleteSoutenance(id:number) : Observable<any>{
    return this.http.delete<any>(`${SOUTENANCE_API}/${id}`)
  }
}
