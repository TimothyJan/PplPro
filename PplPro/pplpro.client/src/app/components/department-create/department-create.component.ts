import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent {
  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  });
  isLoading: boolean = false;

  constructor(private _departmentService: DepartmentService) {}

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.isLoading = true;
      this._departmentService.addDepartment(this.departmentForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.departmentForm.reset();
          this._departmentService.notifyDepartmentsChanged();
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error.message);
        }
      });
    }
  }
}
