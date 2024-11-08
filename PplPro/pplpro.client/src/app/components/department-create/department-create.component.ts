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
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private departmentService: DepartmentService) {}

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.isLoading = true;
      this.departmentService.addDepartment(this.departmentForm.value).subscribe({
        next: () => {
          this.successMessage = 'Department added successfully!';
          this.isLoading = false;
          this.departmentForm.reset();
          this.departmentService.notifyDepartmentAdded();
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }
  }
}
