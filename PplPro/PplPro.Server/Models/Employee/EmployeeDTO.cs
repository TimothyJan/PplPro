﻿namespace PplPro.Server.Models
{
    public class EmployeeDTO
    {
        public int EmployeeID { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentID { get; set; }
        public int RoleID { get; set; }
    }
}
