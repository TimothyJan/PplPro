import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Employee } from '../models/employee';

const apiUrl = 'https://localhost:7040/api/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesChangedSource = new Subject<void>(); //Emit events when employee is added
  employeesChanged$ = this.employeesChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl)
      .pipe(catchError(this.handleError));
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<void> {
    return this.http.post<void>(apiUrl, employee)
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${apiUrl}/${employee.employeeID}`, employee)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
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

  notifyEmployeesChanged(): void {
    this.employeesChangedSource.next();
  }
}
