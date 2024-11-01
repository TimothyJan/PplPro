﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PplPro.Server.Models
{
    public class RoleRepository : IRoleRepository
    {
        private readonly EmployeeDbContext _context;

        public RoleRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleDTO>> GetAllRolesAsync()
        {
            return await _context.Roles
                .Select(r => new RoleDTO
                {
                    RoleID = r.RoleID,
                    RoleName = r.RoleName,
                    DepartmentID = r.DepartmentID
                })
                .ToListAsync();
        }

        public async Task<RoleDTO> GetRoleByIdAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return null;

            return new RoleDTO
            {
                RoleID = role.RoleID,
                RoleName = role.RoleName,
                DepartmentID = role.DepartmentID
            };
        }

        public async Task AddRoleAsync(RoleDTO roleDto)
        {
            var role = new Role
            {
                RoleName = roleDto.RoleName,
                DepartmentID = roleDto.DepartmentID
            };
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRoleAsync(RoleDTO roleDto)
        {
            var role = await _context.Roles.FindAsync(roleDto.RoleID);
            if (role == null) return;

            role.RoleName = roleDto.RoleName;
            role.DepartmentID = roleDto.DepartmentID;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteRoleAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return;

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
        }
    }

}
