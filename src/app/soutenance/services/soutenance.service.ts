
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

const SOUTENANCE_API = 'http://127.0.0.1:3000/soutenance';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  constructor(private http: HttpClient) { }
  getSoutenances(): Observable<any> {
    return this.http.get<any>(SOUTENANCE_API);
  }
}
