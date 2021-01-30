import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

const AUTH_API = 'http://127.0.0.1:3000/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(AUTH_API);
  }

  getStudentsPaginated(page: number,limit: number): Observable<any> {
    let params = new HttpParams();
    if (isNaN(page) && isNaN(limit)){
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { page: '1', limit: '10' },
          queryParamsHandling: 'merge'
        });
    }
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(AUTH_API+ "/paginate", {params})
  }
}
