export class Role {
  roleID: number = 0;
  roleName: string = "";

  constructor(init?: Partial<Role>) {
    Object.assign(this, init);
  }
}
