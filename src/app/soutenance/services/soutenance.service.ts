
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

const SOUTENANCE_API = 'http://127.0.0.1:3000/soutenance';
const ANNEE_API='http://127.0.0.1:3000/annee';
const SESSION_API='http://127.0.0.1:3000/annee';
const JURY_API='http://127.0.0.1:3000/annee';
const SUJET_API='http://127.0.0.1:3000/sujet';
const RAPPORT_PFE_API='http://127.0.0.1:3000/annee';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  constructor(private http: HttpClient) { }
  getSoutenances(page : number=1): Observable<any> {
    return this.http.get<any>(SOUTENANCE_API+`?page=${page}`);
  }
  
}
