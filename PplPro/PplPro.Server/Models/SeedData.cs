using Microsoft.EntityFrameworkCore;
using PplPro.Server.Models;

namespace PplPro.Server.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new EmployeeDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<EmployeeDbContext>>()))
            {
                // Check if the database has already been seeded
                if (context.Departments.Any() || context.Roles.Any() || context.Employees.Any())
                {
                    return; // Database has been seeded, exit method
                }

                // Seed Departments
                var departments = new Department[]
                {
                    new Department { DepartmentName = "Finance" },
                    new Department { DepartmentName = "Human Resources" },
                    new Department { DepartmentName = "Information Technology" }
                };
                context.Departments.AddRange(departments);
                context.SaveChanges();

                // Seed Roles
                var roles = new Role[]
                {
                    new Role { RoleName = "Accountant", DepartmentID = departments[0].DepartmentID },
                    new Role { RoleName = "Financial Analyst", DepartmentID = departments[0].DepartmentID },
                    new Role { RoleName = "Finance Manager", DepartmentID = departments[0].DepartmentID },
                    new Role { RoleName = "HR Assistant", DepartmentID = departments[1].DepartmentID },
                    new Role { RoleName = "HR Specialist", DepartmentID = departments[1].DepartmentID },
                    new Role { RoleName = "HR Director", DepartmentID = departments[1].DepartmentID },
                    new Role { RoleName = "Software Engineer", DepartmentID = departments[2].DepartmentID },
                    new Role { RoleName = "Front-End Developer", DepartmentID = departments[2].DepartmentID },
                    new Role { RoleName = "Back-End Developer", DepartmentID = departments[2].DepartmentID },
                    new Role { RoleName = "Full-Stack Developer", DepartmentID = departments[2].DepartmentID }
                };
                context.Roles.AddRange(roles);
                context.SaveChanges();

                // Seed Employees
                var employees = new Employee[]
                {
                    new Employee { Name = "Alice Johnson", Position = "Accountant", Salary = 60000, DepartmentID = departments[0].DepartmentID, RoleID = roles[0].RoleID },
                    new Employee { Name = "Bob Smith", Position = "Financial Analyst", Salary = 70000, DepartmentID = departments[0].DepartmentID, RoleID = roles[1].RoleID },
                    new Employee { Name = "Catherine Green", Position = "HR Specialist", Salary = 65000, DepartmentID = departments[1].DepartmentID, RoleID = roles[4].RoleID },
                    new Employee { Name = "David Brown", Position = "Software Engineer", Salary = 90000, DepartmentID = departments[2].DepartmentID, RoleID = roles[6].RoleID }
                };
                context.Employees.AddRange(employees);
                context.SaveChanges();
            }
        }
    }
}
