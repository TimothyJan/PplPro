export class Employee {
  employeeID: number = 0;
  name: string = "";
  position: string = "";
  salary: number = 0;
  departmentID: number = 0;
  roleID: number = 0;

  constructor(employeeID: number, name: string, position: string, salary: number, departmentID: number, roleID: number) {
    this.employeeID = employeeID;
    this.name = name;
    this.position = position;
    this.salary = salary;
    this.departmentID = departmentID;
    this.roleID = roleID;
  }
}
