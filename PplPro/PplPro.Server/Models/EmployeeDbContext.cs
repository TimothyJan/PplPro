using Microsoft.EntityFrameworkCore;

namespace PplPro.Server.Models
{
    public class EmployeeDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Role> Roles { get; set; }

        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany()
                .HasForeignKey(e => e.DepartmentID);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Role)
                .WithMany()
                .HasForeignKey(e => e.RoleID);

            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentID = 1, DepartmentName = "Human Resources" },
                new Department { DepartmentID = 2, DepartmentName = "Engineering" }
            );
        }
    }

}
