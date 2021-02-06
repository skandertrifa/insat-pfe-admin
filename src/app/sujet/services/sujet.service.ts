import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const SUJET_API  = 'http://127.0.0.1:3000/sujet';


@Injectable({
  providedIn: 'root'
})
export class SujetService {

  constructor(private http: HttpClient) { }
  getSujets(page : number=1): Observable<any> {
    return this.http.get<any>(SUJET_API+`?page=${page}`);
  }

  downloadRapport(id):Observable<any> {
    return this.http.get<any>(SUJET_API+'/downloadRapport' + `/${id}`);
  }

  downloadFiche(id):Observable<any>{
    return this.http.get<any>(SUJET_API+'/downloadFicheProp' + `/${id}`)
  }

  downloadLettre(id):Observable<any>{
    return this.http.get<any>(SUJET_API+'/downloadLettre' + `/${id}`)
  }

  uploadLettre(id:number,file:FormData):Observable<any>{
    return this.http.post<any>(SUJET_API+'/upload/lettreAffirmation' + `/${id}`,file)
  }

  deleteSujet(id: number): Observable<any>{
    console.log("deleteSujet from service here!")
    return this.http.delete<any>(SUJET_API + "/" + id);
  }

  updateSujet(sujetUpdate,id:number): Observable<any>{
    console.log(sujetUpdate);
    return this.http.put<any>(SUJET_API + "/" +id,sujetUpdate);
  }
}
