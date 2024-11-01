using Microsoft.EntityFrameworkCore;
using PplPro.Server.Models;

namespace PplPro.Server.Models
{
    public static class SeedData
    {
        public static void Initialize(EmployeeDbContext context)
        {
            // Check if there are existing departments
            if (context.Departments.Any())
            {
                return;   // DB has been seeded
            }

            var departments = new Department[]
            {
                new Department { DepartmentID = 1, DepartmentName = "Finance" },
                new Department { DepartmentID = 2, DepartmentName = "Human Resources" },
                new Department { DepartmentID = 3, DepartmentName = "Information Technology" }
            };

            var roles = new Role[]
            {
                new Role { RoleID = 1, RoleName = "Accountant", DepartmentID = 1 },
                new Role { RoleID = 2, RoleName = "Financial Analyst", DepartmentID = 1 },
                new Role { RoleID = 3, RoleName = "Finance Manager", DepartmentID = 1 },
                new Role { RoleID = 4, RoleName = "HR Assistant", DepartmentID = 2 },
                new Role { RoleID = 5, RoleName = "HR Specialist", DepartmentID = 2 },
                new Role { RoleID = 6, RoleName = "HR Director", DepartmentID = 2 },
                new Role { RoleID = 7, RoleName = "Software Engineer", DepartmentID = 3 },
                new Role { RoleID = 8, RoleName = "Front-End Developer", DepartmentID = 3 },
                new Role { RoleID = 9, RoleName = "Back-End Developer", DepartmentID = 3 },
                new Role { RoleID = 10, RoleName = "Full-Stack Developer", DepartmentID = 3 }
            };

            context.Departments.AddRange(departments);
            context.Roles.AddRange(roles);
            context.SaveChanges();
        }
    }
}
