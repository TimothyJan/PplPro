import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { Subject, takeUntil } from 'rxjs';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit, OnDestroy {
  roles: Role[] = [];
  departments: Department[] = [];
  editModeRoleId: number | null = null;
  dataFetched: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _roleService: RoleService,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadDepartments();

    this._roleService.roleAdded$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.loadRoles()
    });
  }

  /** Load Roles */
  loadRoles(): void {
    this.isLoading = true;
    this._roleService.getRoles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.roles = data;
          this.dataFetched = true;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
  }

  loadDepartments(): void {
    this.isLoading = true;
    this._departmentService.getDepartments()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.dataFetched = true;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
  }

  /** Get Department name from DepartmentID */
  getDepartmentName(departmentID: number): string | undefined {
    const department = this.departments.find(dep => dep.departmentID == departmentID);
    return department ? department.departmentName : undefined;
  }

  enterEditMode(roleId: number): void {
    this.editModeRoleId = roleId;
  }

  saveChanges(department: Role): void {
    this._roleService.updateRole(department)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.successMessage = 'Role updated successfully!';
          this.editModeRoleId = null;
          this.loadRoles();
        },
        error: (err) => this.errorMessage = err.message
      });
  }

  onDelete(departmentID: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this._roleService.deleteRole(departmentID)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.successMessage = 'Role deleted successfully!';
            this.loadRoles();
          },
          error: (err) => this.errorMessage = err.message
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
