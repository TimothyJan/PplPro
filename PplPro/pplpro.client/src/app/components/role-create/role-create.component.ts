import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { RoleService } from '../../services/role.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent implements OnInit, OnDestroy {
  roleForm: FormGroup = new FormGroup({
    roleName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    departmentID: new FormControl(null, Validators.required)
  });
  departments: Department[] = [];
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _roleService: RoleService,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
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

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.isLoading = true;
      const formValue = {
        ...this.roleForm.value,
        departmentID: Number(this.roleForm.value.departmentID)
      };
      // console.log('Form Submitted:', formValue);
      this._roleService.addRole(this.roleForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.roleForm.reset();
          this._roleService.notifyRolesChanged();
        },
        error: (error) => {
          console.log(error.message);
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

