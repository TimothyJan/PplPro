import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      console.log(data);
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}
