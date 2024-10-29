using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PplPro.Server.Models
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeDbContext _context;

        public EmployeeRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            try
            {
                return await _context.Employees
                                     .Include(e => e.Department)
                                     .Include(e => e.Role)
                                     .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving employees.", ex);
            }
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            try
            {
                return await _context.Employees.FindAsync(id); // This will return null if not found
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the employee with ID {id}.", ex);
            }
        }

        public async Task AddEmployeeAsync(Employee employee)
        {
            try
            {
                await _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the employee.", ex);
            }
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            try
            {
                _context.Employees.Update(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the employee.", ex);
            }
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee != null)
                {
                    _context.Employees.Remove(employee);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the employee with ID {id}.", ex);
            }
        }
    }
}
