import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

const apiUrl = `${environment.apiUrl}/role`;

// const apiUrl = 'https://localhost:7040/api/role';
// const apiUrl = './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private rolesChangedSource = new Subject<void>();  // Emit events when role is added
  rolesChanged$ = this.rolesChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(apiUrl)
      .pipe(catchError(this.handleError));
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getRolesFromDepartmentID(departmentID: number): Observable<Role[]> {
    return this.http.get<Role[]>(`${apiUrl}/GetRolesFromDepartmentID/${departmentID}`)
      .pipe(catchError(this.handleError));
  }

  addRole(role: Role): Observable<void> {
    return this.http.post<void>(apiUrl, role)
      .pipe(catchError(this.handleError));
  }

  updateRole(role: Role): Observable<void> {
    return this.http.put<void>(`${apiUrl}/${role.roleID}`, role)
      .pipe(catchError(this.handleError));
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`)
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

  notifyRolesChanged(): void {
    this.rolesChangedSource.next();
  }
}
