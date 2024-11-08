import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { Role } from '../../models/role';
import { DepartmentService } from '../../services/department.service';
import { RoleService } from '../../services/role.service';
import { Subject, takeUntil } from 'rxjs';

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
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  originalRoleID: number | null = null;
  rolePlaceholderID = 0;  // Placeholder value for unselected role

  constructor(
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
    this.loadRoles();
  }

  /** Load all Employees */
  loadEmployees(): void {
    this.isLoading = true;
    this._employeeService.getEmployees()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.employees = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error.message);
          this.isLoading = false;
        }
      });

    // Subscribe to the employee added notification
    this._employeeService.employeesChanged$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.loadEmployees(); // Reload employees when a new one is added
    })
  }

  /** Load Departments and subscribe to Departments  */
  loadDepartments(): void {
    this.isLoading = true;
    this._departmentService.getDepartments()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error.message);
          this.isLoading = false;
        }
      });

    // Subscribe to the department added notification
    this._departmentService.departmentsChanged$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.loadDepartments();  // Reload departments when a new one is added
    });
  }

  /** Load Roles and subscribe to Roles*/
  loadRoles(): void {
    this.isLoading = true;
    this._roleService.getRoles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.roles = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error.message);
          this.isLoading = false;
        }
      });

    // Subscribe to the role added notification
    this._roleService.rolesChanged$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.loadRoles(); // Reload roles when a new one is added
    });
  }

  /** Get Department name from DepartmentID */
  getDepartmentName(departmentID: number): string | undefined {
    const department = this.departments.find(dep => dep.departmentID == departmentID);
    return department ? department.departmentName : undefined;
  }

  /** Get Role name from RoleID */
  getRoleName(roleID: number): string | undefined {
    const role = this.roles.find(role => role.roleID === roleID);
    return role ? role.roleName : undefined;
  }

  /** Enter Edit mode for editting Employee list */
  enterEditMode(employeeId: number): void {
    this.editModeEmployeeId = employeeId;
    const employee = this.employees.find(emp => emp.employeeID === employeeId);
    if (employee) {
      this.originalRoleID = employee.roleID;
      this.filterRolesByDepartment(employee.departmentID);
    }
  }

  /** Load associated Roles when Department selection is changed  */
  onDepartmentChange(departmentID: number): void {
    this.filterRolesByDepartment(departmentID);
    const employee = this.employees.find(emp => emp.employeeID === this.editModeEmployeeId);
    if (employee) {
      employee.roleID = this.rolePlaceholderID;  // Reset to placeholder
    }
  }

  /** Filter Roles based on DepartmentID */
  filterRolesByDepartment(departmentID: number): void {
    this.filteredRoles = this.roles.filter(role => role.departmentID == departmentID);
  }

  /** Update Employee and leave Edit mode */
  saveChanges(employee: Employee): void {
    if (employee.roleID !== this.rolePlaceholderID) {
      this._employeeService.updateEmployee(employee)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.editModeEmployeeId = null;
          this.loadEmployees();
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
    this.editModeEmployeeId = null;
  }

  /** Delete Employee */
  onDelete(employeeID: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this._employeeService.deleteEmployee(employeeID)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
  }
}
