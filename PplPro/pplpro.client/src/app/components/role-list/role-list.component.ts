import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit{
  roles: Role[] = [];
  editModeRoleId: number | null = null;

  constructor(private _roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  /** Load all roles */
  loadRoles(): void {
    this.roles = this._roleService.getRoles();
  }

  /** Enter Edit mode for editting role list */
  enterEditMode(roleId: number): void {
    this.editModeRoleId = roleId;
  }

  /** Leave Edit mode and save changes */
  saveChanges(role: Role): void {
    this._roleService.updateRole(role);
    this.editModeRoleId = null;
    this.loadRoles(); // Reload roles to reflect changes
  }

  /** Delete Role */
  onDelete(roleID: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this role?');
    if (confirmDelete) {
      this._roleService.deleteRole(roleID);
      this.loadRoles(); // Reload roles after deletion
    }
  }
}
