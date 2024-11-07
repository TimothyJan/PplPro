using Microsoft.AspNetCore.Mvc;
using PplPro.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PplPro.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDTO>>> GetAllRoles()
        {
            var roles = await _roleRepository.GetAllRolesAsync();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleById(int id)
        {
            var role = await _roleRepository.GetRoleByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleDTO roleDto)
        {
            await _roleRepository.AddRoleAsync(roleDto);
            return CreatedAtAction(nameof(GetRoleById), new { id = roleDto.RoleID }, roleDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] RoleDTO roleDto)
        {
            if (id != roleDto.RoleID)
            {
                return BadRequest();
            }

            await _roleRepository.UpdateRoleAsync(roleDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            await _roleRepository.DeleteRoleAsync(id);
            return NoContent();
        }

        [HttpGet("GetRolesFromDepartmentID/{departmentId}")]
        public async Task<ActionResult<IEnumerable<RoleDTO>>> GetRolesFromDepartmentID(int departmentId)
        {
            var roles = await _roleRepository.GetRolesByDepartmentIdAsync(departmentId);
            return Ok(roles);
        }

    }
}
