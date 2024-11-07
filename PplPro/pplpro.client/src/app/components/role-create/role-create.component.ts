import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent implements OnInit{
  roleForm: FormGroup = new FormGroup({
    roleName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    departmentID: new FormControl(null, Validators.required)
  });
  departments: Department[] = [];
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private _roleService: RoleService,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  /** Get departments from Department Service */
  getDepartments(): void {
    this._departmentService.getDepartments().subscribe(data => {
      this.departments = data;
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
          this.successMessage = 'Department added successfully!';
          this.isLoading = false;
          this.roleForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }
  }

}

