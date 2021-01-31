
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import {  CreateSalle } from '../models/create-soutenance';


const SALLE_API='http://127.0.0.1:3000/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient) { }
  getSalles(): Observable<any> {
    return this.http.get<any>(SALLE_API);
  }
  createSalle(Salle: CreateSalle) : Observable<any>{
    
    return this.http.post<any>(SALLE_API,Salle)
  }
  modifySalle(Salle: Partial<CreateSalle>,id:number) : Observable<any>{
    return this.http.put<any>(`${SALLE_API}/${id}`,Salle)
  }
  deleteSalle(id:number) : Observable<any>{
    return this.http.delete<any>(`${SALLE_API}/${id}`)
  }
  
}
