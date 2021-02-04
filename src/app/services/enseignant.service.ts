import { Enseignant } from 'src/app/models/enseignant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


const ENSEIGNANT_API = 'http://127.0.0.1:3000/teacher';


@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  getEnseignants(): Observable<any> {
    return this.http.get<any>(ENSEIGNANT_API);
  }

  getTeachersPaginated(page: number,limit: number): Observable<any> {
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

    return this.http.get<any>(ENSEIGNANT_API+ "/paginate", {params})
  }

  postEnseignant(enseignant: Enseignant): Observable<any> {
    return this.http.post<any>(ENSEIGNANT_API, enseignant);
  }

  addTeachersFromExcel(fd: FormData): Observable<any>{
    return this.http.post<any>(ENSEIGNANT_API + "/upload",fd);
  }

  putEnseignant(enseignant: Enseignant, id: number): Observable<any> {
    return this.http.put<any>(ENSEIGNANT_API + "/" + id, enseignant)
  }

  deleteEnseignant(id: number): Observable<any> {
    return this.http.delete<any>(ENSEIGNANT_API + "/" + id);
  }
}
