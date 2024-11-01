using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PplPro.Server.Models;

namespace PplPro.Server.Models
{
    public class Department
    {
        [Key]
        public int DepartmentID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Department name cannot exceed 50 characters.")]
        public string DepartmentName { get; set; }

        // Navigation properties for related collections
        public ICollection<Role> Roles { get; set; } = new List<Role>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
