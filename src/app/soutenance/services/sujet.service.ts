import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const SUJET_API = 'http://127.0.0.1:3000/sujet';

@Injectable({
  providedIn: 'root'
})
export class SujetService {

  constructor(private http: HttpClient) { 
    
  }
  getSujets(): Observable<any> {
    return this.http.get<any>(SUJET_API+"?page=1");
  }
}
