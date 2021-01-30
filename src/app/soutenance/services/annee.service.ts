
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Annee } from '../models/soutenance';
import { CreateAnnee } from '../models/create-soutenance';


const ANNEE_API='http://127.0.0.1:3000/annee';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  constructor(private http: HttpClient) { }
  getAnnees(): Observable<any> {
    return this.http.get<any>(ANNEE_API);
  }
  createAnnee(annee: CreateAnnee) : Observable<any>{
    
    return this.http.post<any>(ANNEE_API,annee)
  }
  modifyAnnee(annee: Partial<CreateAnnee>,id:number) : Observable<any>{
    return this.http.put<any>(`${ANNEE_API}/${id}`,annee)
  }
  deleteAnnee(id:number) : Observable<any>{
    return this.http.delete<any>(`${ANNEE_API}/${id}`)
  }
  
}
