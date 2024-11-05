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

  departments: Department[] = [];

  roleForm: FormGroup = new FormGroup({
    roleName: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    departmentID: new FormControl(null, Validators.required)
  });

  constructor(
    private _roleService: RoleService,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  /** Get departments from Department Service */
  getDepartments(): void {
    this.departments = this._departmentService.getDepartments();
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const formValue = {
        ...this.roleForm.value,
        departmentID: Number(this.roleForm.value.departmentID)
      };
      // console.log('Form Submitted:', formValue);
      this._roleService.addRole(formValue);
      this.roleForm.reset();
    }
  }

}

