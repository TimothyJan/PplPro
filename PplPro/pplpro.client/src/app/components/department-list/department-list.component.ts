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
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private _departmentService: DepartmentService) {}

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

  enterEditMode(departmentId: number): void {
    this.editModeDepartmentId = departmentId;
  }

  saveChanges(department: Department): void {
    this._departmentService.updateDepartment(department)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.editModeDepartmentId = null;
          this._departmentService.notifyDepartmentsChanged();
          this.loadDepartments();
        },
        error: (error) => {
          console.log(error.message);
        }
      });
  }

  onDelete(departmentID: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this._departmentService.deleteDepartment(departmentID)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.loadDepartments();
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
