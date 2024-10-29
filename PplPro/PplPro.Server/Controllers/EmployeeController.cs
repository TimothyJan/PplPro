using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PplPro.Server.Models;
using System.Threading.Tasks;

namespace PplPro.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeRepository.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return NotFound(); // Return 404 if not found
            }
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            await _employeeRepository.AddEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeID }, employee); // Return 201 Created
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeID)
            {
                return BadRequest(); // Return 400 Bad Request if IDs do not match
            }

            var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (existingEmployee == null)
            {
                return NotFound(); // Return 404 if the employee is not found
            }

            await _employeeRepository.UpdateEmployeeAsync(employee);
            return NoContent(); // Return 204 No Content to indicate success
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (existingEmployee == null)
            {
                return NotFound(); // Return 404 if the employee is not found
            }

            await _employeeRepository.DeleteEmployeeAsync(id);
            return NoContent(); // Return 204 No Content to indicate success
        }
    }
}
