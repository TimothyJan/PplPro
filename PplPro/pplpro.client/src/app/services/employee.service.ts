import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private apiUrl = 'https://localhost:7040/api/employee';

  // constructor(private http: HttpClient) { }

  // getEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl);
  // }

  // getEmployee(id: number): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  // }

  // addEmployee(employee: Employee): Observable<void> {
  //   return this.http.post<void>(this.apiUrl, employee);
  // }

  // updateEmployee(id: number, employee: Employee): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  // }

  // deleteEmployee(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  employeeID:number = 4;

  employees: Employee[] = [
    new Employee(0, "Alice Johnson", "Accountant", 60000, 0, 0),
    new Employee(1, "Bob Smith", "Financial Analyst", 70000, 0, 1),
    new Employee(2, "Catherine Green", "HR Specialist", 65000, 1, 4),
    new Employee(3, "David Brown", "Software Engineer", 90000, 2, 6),
  ];

  constructor() { }

  /** Get Employees */
  getEmployees(): Employee[] {
    return this.employees;
  }

  /** Get Employee based on id */
  getEmployee(id: number): Employee | undefined {
    for(let i=0; i<this.employees.length; i++) {
      if(this.employees[i].employeeID == id) {
        return this.employees[i];
      }
    }
    return undefined
  }

  /** Post new Employee */
  addEmployee(employee: Employee): void {
    let newEmployee = new Employee(this.employeeID++, employee.name, employee.position, employee.salary, employee.departmentID, employee.roleID);
    this.employees.push(newEmployee);
    // console.log(this.employees);
  }

  /** Update existing Employee based on id */
  updateEmployee(employee: Employee): void {
    for(let i=0; i<this.employees.length; i++) {
      if(this.employees[i].employeeID == employee.employeeID) {
        this.employees[i] = employee;
      }
    }
  }

  /** Delete Employee based on id */
  deleteEmployee(id: number): void {
    for(let i=0; i<this.employees.length; i++) {
      if(this.employees[i].employeeID == id) {
        this.employees.splice(i, 1);
      }
    }
  }
}
