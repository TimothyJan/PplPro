export class Department {
  departmentID: number = 0;
  departmentName: string = "";

  constructor(init?: Partial<Department>) {
    Object.assign(this, init);
  }
}
