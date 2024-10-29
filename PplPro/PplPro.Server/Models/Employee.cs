using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PplPro.Server.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeID { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Position name cannot exceed 50 characters.")]
        public string Position { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Salary { get; set; }

        [Required]
        [ForeignKey("Department")]
        public int DepartmentID { get; set; }
        public Department Department { get; set; }

        [Required]
        [ForeignKey("Role")]
        public int RoleID { get; set; }
        public Role Role { get; set; }
    }

    public class Department
    {
        [Key]
        public int DepartmentID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Department name cannot exceed 50 characters.")]
        public string DepartmentName { get; set; }
    }

    public class Role
    {
        [Key]
        public int RoleID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Role name cannot exceed 50 characters.")]
        public string RoleName { get; set; }
    }

}
