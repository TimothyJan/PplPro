import { Component, OnDestroy, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  editModeDepartmentId: number | null = null;
  dataFetched: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private _departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
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

  enterEditMode(departmentId: number): void {
    this.editModeDepartmentId = departmentId;
  }

  saveChanges(department: Department): void {
    this._departmentService.updateDepartment(department)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.successMessage = 'Department updated successfully!';
          this.editModeDepartmentId = null;
          this.loadDepartments();
        },
        error: (err) => this.errorMessage = err.message
      });
  }

  onDelete(departmentID: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this._departmentService.deleteDepartment(departmentID)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.successMessage = 'Department deleted successfully!';
            this.loadDepartments();
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
