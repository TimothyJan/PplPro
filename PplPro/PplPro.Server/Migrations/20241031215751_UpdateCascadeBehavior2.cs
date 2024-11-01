using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PplPro.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCascadeBehavior2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Departments_DepartmentID",
                table: "Roles");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Departments_DepartmentID",
                table: "Roles",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DepartmentID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Departments_DepartmentID",
                table: "Roles");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Departments_DepartmentID",
                table: "Roles",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DepartmentID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
