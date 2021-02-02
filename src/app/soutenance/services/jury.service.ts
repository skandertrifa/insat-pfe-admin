import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateJury } from '../models/create-soutenance';


const JURY_API='http://127.0.0.1:3000/jury';

@Injectable({
  providedIn: 'root'
})
export class JuryService {

  constructor(private http: HttpClient) { }
  getJuries(): Observable<any> {
    return this.http.get<any>(JURY_API);
  }
  createJury(jury: CreateJury) : Observable<any>{
    
    return this.http.post<any>(JURY_API,jury)
  }
  modifyJury(jury: Partial<CreateJury>,id:number) : Observable<any>{
    return this.http.put<any>(`${JURY_API}/${id}`,jury)
  }
  deleteJury(id:number) : Observable<any>{
    return this.http.delete<any>(`${JURY_API}/${id}`)
  }
  
}
