import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

const AUTH_API = 'http://127.0.0.1:3000/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(AUTH_API);
  }

  getStudentsPaginated(page: number,limit: number): Observable<any> {
    return this.http.get<any>(AUTH_API+ "/paginate?page=" + page + "&limit=" + limit);
  }
}
