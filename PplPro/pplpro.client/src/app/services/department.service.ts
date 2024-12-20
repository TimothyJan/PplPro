import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

const apiUrl = `${environment.apiUrl}/department`;

// const apiUrl = 'https://localhost:7040/api/department';
// const apiUrl = './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentsChangedSource = new Subject<void>();  // Emit events when department is added
  departmentsChanged$ = this.departmentsChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(apiUrl)
      .pipe(catchError(this.handleError));
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addDepartment(department: Department): Observable<void> {
    return this.http.post<void>(apiUrl, department)
      .pipe(catchError(this.handleError));
  }

  updateDepartment(department: Department): Observable<void> {
    return this.http.put<void>(`${apiUrl}/${department.departmentID}`, department)
      .pipe(catchError(this.handleError));
  }

  deleteDepartment(id: number): Observable<void> {
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

  notifyDepartmentsChanged(): void {
    this.departmentsChangedSource.next();
  }
}
