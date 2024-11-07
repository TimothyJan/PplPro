import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit, OnDestroy {
  roles: Role[] = [];
  editModeRoleId: number | null = null;
  dataFetched: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private _roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

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

  enterEditMode(departmentId: number): void {
    this.editModeRoleId = departmentId;
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
