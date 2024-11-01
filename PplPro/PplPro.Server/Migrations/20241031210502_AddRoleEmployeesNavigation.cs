using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PplPro.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleEmployeesNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentID",
                keyValue: 2);

            migrationBuilder.AddColumn<int>(
                name: "DepartmentID",
                table: "Roles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_DepartmentID",
                table: "Roles",
                column: "DepartmentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Departments_DepartmentID",
                table: "Roles",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DepartmentID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Departments_DepartmentID",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_DepartmentID",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "DepartmentID",
                table: "Roles");

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentID", "DepartmentName" },
                values: new object[,]
                {
                    { 1, "Human Resources" },
                    { 2, "Engineering" }
                });
        }
    }
}
