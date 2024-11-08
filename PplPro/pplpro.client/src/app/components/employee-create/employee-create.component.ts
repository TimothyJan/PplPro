import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../../models/department';
import { Role } from '../../models/role';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent implements OnInit{
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    position: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    salary: new FormControl(0,  Validators.min(0)),
    departmentID: new FormControl(null, Validators.required),
    roleID: new FormControl(null, Validators.required)
  });
  departments: Department[] = [];
  roles: Role[] = [];
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();

    // Listen to changes on departmentID and update roles accordingly
    this.departmentSelectionChange();
  }

  /** Load Departments and subscribe to Departments */
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

  /** Department change updates the roles array to the selected Department Roles  */
  departmentSelectionChange(): void {
    this.employeeForm.get('departmentID')!.valueChanges.subscribe(departmentID => {
      if (departmentID) {
        this.getRolesFromDepartmentID(departmentID);
      } else {
        this.roles = [];
        this.employeeForm.get('roleID')!.reset();
      }
    });
  }

  /** Roles array is updated to selected departmentID Department roles */
  getRolesFromDepartmentID(departmentID: number): void {
    this._roleService.getRolesFromDepartmentID(departmentID)
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
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      const formValue = {
        ...this.employeeForm.value,
        departmentID: Number(this.employeeForm.value.departmentID),
        roleID: Number(this.employeeForm.value.roleID),
      }
      // console.log('Form Submitted:', formValue);
      this._employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.employeeForm.reset();
          this._employeeService.notifyEmployeesChanged();
        },
        error: (error) => {
          console.log(error.message);
          this.isLoading = false;
        }
      });
    }
  }
}
