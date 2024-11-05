import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit{
  departments: Department[] = [];
  editModeDepartmentId: number | null = null;

  constructor(private _departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  /** Load all Departments */
  loadDepartments(): void {
    this.departments = this._departmentService.getDepartments();
  }

  /** Enter Edit mode for editting Department list */
  enterEditMode(departmentId: number): void {
    this.editModeDepartmentId = departmentId;
  }

  /** Update Department and leave Edit mode */
  saveChanges(department: Department): void {
    this._departmentService.updateDepartment(department);
    this.editModeDepartmentId = null;
    this.loadDepartments(); // Reload departments to reflect changes
  }

  /** Delete Department */
  onDelete(departmentID: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this department?');
    if (confirmDelete) {
      this._departmentService.deleteDepartment(departmentID);
      this.loadDepartments(); // Reload departments after deletion
    }
  }
}
