import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const SUJET_API  = 'http://127.0.0.1:3000/sujet';
const RAPPORT_API  = 'http://127.0.0.1:3000/rapport/download';

@Injectable({
  providedIn: 'root'
})
export class SujetService {

  constructor(private http: HttpClient) { }
  getSujets(page : number=1): Observable<any> {
    return this.http.get<any>(SUJET_API+`?page=${page}`);
  }

  downloadRapport(id):Observable<any> {
    return this.http.get<any>(RAPPORT_API+`/${id}`);
  }



  deleteSujet(id: number): Observable<any>{
    console.log("deleteSujet from service here!")
    return this.http.delete<any>(SUJET_API + "/" + id);
  }
}
