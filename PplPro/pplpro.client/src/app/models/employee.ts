import { Department } from "./department";
import { Role } from "./role";

export class Employee {
  employeeID: number = 0;
  name: string = "";
  position: string = "";
  salary: number = 0;
  departmentID: number = 0;
  department: Department  = new Department();
  roleID: number = 0;
  role: Role = new Role();

  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
