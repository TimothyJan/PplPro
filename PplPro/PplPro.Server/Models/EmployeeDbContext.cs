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
                .WithMany(d => d.Employees) // Navigation property for Employees
                .HasForeignKey(e => e.DepartmentID)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes for Departments

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Role)
                .WithMany(r => r.Employees) // Ensure Role has navigation property for Employees
                .HasForeignKey(e => e.RoleID)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes for Roles

            modelBuilder.Entity<Role>()
                .HasOne(r => r.Department)
                .WithMany(d => d.Roles) // Ensure Department has navigation property for Roles
                .HasForeignKey(r => r.DepartmentID)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes for Roles
        }
    }
}
