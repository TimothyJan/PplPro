import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'https://localhost:7040/api/role';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getRolesFromDepartmentID(departmentID: number): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/GetRolesFromDepartmentID/${departmentID}`)
      .pipe(catchError(this.handleError));
  }

  addRole(role: Role): Observable<void> {
    return this.http.post<void>(this.apiUrl, role)
      .pipe(catchError(this.handleError));
  }

  updateRole(role: Role): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${role.roleID}`, role)
      .pipe(catchError(this.handleError));
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

}
