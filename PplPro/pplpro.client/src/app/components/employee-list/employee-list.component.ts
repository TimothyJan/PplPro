import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { Role } from '../../models/role';
import { DepartmentService } from '../../services/department.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  editModeEmployeeId: number | null = null;
  originalRoleID: number | null = null;
  rolePlaceholderID = 0;  // Placeholder value for unselected role
  dataFetched: boolean = false;

  constructor(
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this._departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
    this.roles = this._roleService.getRoles();
  }

  /** Load all Employees */
  loadEmployees(): void {
    this._employeeService.getEmployees().subscribe(data => {
      // console.log(data);
      this.employees = data;
      this.dataFetched = true;
    });
  }

  /** Get Department name from DepartmentID */
  getDepartmentName(departmentID: number): string | undefined {
    // this._departmentService.getDepartment(departmentID).subscribe(data => {
    //   return data.departmentName;
    // });
    return undefined;
  }

  /** Get Role name from RoleID */
  getRoleName(roleID: number): string | undefined {
    return this._roleService.getRole(roleID)?.roleName;
  }

  /** Enter Edit mode for editting Employee list */
  enterEditMode(employeeId: number): void {
    this.editModeEmployeeId = employeeId;
    const employee = this.employees.find(emp => emp.employeeID === employeeId);
    if (employee) {
      this.originalRoleID = employee.roleID;
      this.filteredRoles = this._roleService.getRolesFromDepartmentID(employee.departmentID);
    }
  }

  /** Load associated Roles when Department selection is changed  */
  onDepartmentChange(departmentID: number): void {
    this.filteredRoles = this._roleService.getRolesFromDepartmentID(departmentID);
    const employee = this.employees.find(emp => emp.employeeID === this.editModeEmployeeId);
    if (employee) {
      employee.roleID = this.rolePlaceholderID;  // Reset to placeholder
    }
  }

  /** Update Employee and leave Edit mode */
  saveChanges(employee: Employee): void {
    if (employee.roleID !== this.rolePlaceholderID) {
      this._employeeService.updateEmployee(employee);
    }
    this.editModeEmployeeId = null;
  }

  /** Delete Employee */
  onDelete(employeeID: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this._employeeService.deleteEmployee(employeeID);
      this.loadEmployees();
    }
  }
}
