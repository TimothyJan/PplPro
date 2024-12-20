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
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _roleService: RoleService,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadRoles();
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

  /** Load Roles and subscribe to Roles */
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

  enterEditMode(roleId: number): void {
    this.editModeRoleId = roleId;
  }

  saveChanges(department: Role): void {
    this._roleService.updateRole(department)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.editModeRoleId = null;
          this.loadRoles();
        },
        error: (error) => {
          console.log(error.message);
        }
      });
  }

  onDelete(departmentID: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this._roleService.deleteRole(departmentID)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.loadRoles();
          },
          error: (error) => {
            console.log(error.message);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
