using System.Collections.Generic;
using System.Threading.Tasks;

namespace PplPro.Server.Models
{
    public interface IRoleRepository
    {
        Task<IEnumerable<RoleDTO>> GetAllRolesAsync();
        Task<RoleDTO> GetRoleByIdAsync(int id);
        Task AddRoleAsync(RoleDTO roleDto);
        Task UpdateRoleAsync(RoleDTO roleDto);
        Task DeleteRoleAsync(int id);
        Task<IEnumerable<RoleDTO>> GetRolesByDepartmentIdAsync(int departmentId);
    }

}
