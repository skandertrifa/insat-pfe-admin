import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSession } from '../models/create-soutenance';


const SESSION_API='http://127.0.0.1:3000/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  getSessions(): Observable<any> {
    return this.http.get<any>(SESSION_API);
  }
  createSession(Session: CreateSession) : Observable<any>{
    
    return this.http.post<any>(SESSION_API,Session)
  }
  modifySession(Session: Partial<CreateSession>,id:number) : Observable<any>{
    return this.http.put<any>(`${SESSION_API}/${id}`,Session)
  }
  deleteSession(id:number) : Observable<any>{
    return this.http.delete<any>(`${SESSION_API}/${id}`)
  }
  
}
