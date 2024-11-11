# PplPro
Employee Management System with Angular (frontend), ASP.NET Core (backend), and SQL (database).

Process:
<ul>
  <li>Set up Azure SQL Database
    <ul>
      <li>Create SQL database and choose pricing(free or basic lol).</li>
      <li>Configure firewall settings(add local machine's IP address)</li>
      <li>Get Connection String.</li>
    </ul>
  </li>
  <li>Create ASP.NET Core API Project
    <ul>
      <li>Create Project.</li>
      <li>Add Required NuGet Packages
        <ul>
          <li><code>Microsoft.EntityFrameworkCore</code></li>
          <li><code>Microsoft.EntityFrameworkCore.SqlServer</code>></li>
          <li><code>Microsoft.EntityFrameworkCore.Tools</code></li>
          <li><code>Swashbuckle.AspNetCore</code></li>
        </ul>
      </li>
      <li>Define Models(Department, Role, Employee) and Data Transfer Objects (DTOs).
        <ul>
          <li>DTOs allow you to shape the data sent to the client and avoid exposing the navigation properties that cause cycles.
          </li>
        </ul>
      </li>
      <li>Create Database Context Setup
        <ul>
          <li>DbContext is used for querying data, tracking changes, saving data and managing relationships.</li>
          <li>Restrict delete behavior to prevent cascading deletes for roles and departments.</li>
        </ul>
      </li>
      <li>Set up model repository for each model (DepartmentRepository, RoleRepository, EmployeeRepository)
        <ul>
          <li>Repository layer is a design pattern that abstracts and centralizes data access logic, providing a clean separation between the data layer and the business logic, improving maintainability, flexibility, and testability.</li>
        </ul>
      </li>
      <li>Create Controllers for each Model.</li>
      <li>Set Up Environment Variables, specifically the connection string.</li>
      <li>Configure Program.cs to use connection string from environmental variables.</li>
      <li>Run Database Migrations.
        <ul>
          <li>Tools -> NuGet Package Manager -> Package Manager Console.</li>
          <li>~<code>Add-Migration InitialCreate</code> too add initial migrations. Generate a migration file in a folder called Migrations. The file contains the SQL schema changes required to create tables and relationships based on your models.</li>
          <li>~<code>Update-Database</code> will use the connection string in appsettings.json to connect to the Azure SQL Database and apply the schema changes defined in the migration.</li>
        </ul>
      </li>
      <li>Initialize the Database with Sample Data. Create a SeedData.cs.</li>
    </ul>
  </li>
  <li>Design frontend and set Up Angular Frontend to Communicate with the API.
    <ul>
      <li>Install dependencies
        <ul>
          <li>Bootstrap</li>
        </ul>
      </li>
      <li>Create Models (Department, Role, Employee)</li>
      <li>Generate components and services for Department, Role, Employee.</li>
      <li>Configure Angular Environment Variables for development and production using environment.</li>
      <li>Set up HTTP Interactions, connecting Angular to ASP.NET Core API.</li>
      <li>Enable CORS in ASP.NET Core.</li>
      <li>Build Angular for production
        <ul>
          <li>~ng build --configuration production</li>
        </ul>
      </li>
      <li>Create <code>wwwroot</code> folder and add production browser files here (favicon.io, index.html, main, polyfills, and styles).</li>
      <li>Configure Program.cs to UseDefaultFiles and UseStaticFiles.</li>
    </ul>
  </li>
  <li>Deploy to Azure App Service
    <ul>
      <li>Create an Azure App Service.</li>
      <li>Set Environment Variables in Azure.</li>
      <li>Modify Program.cs to Support Swagger</li>
      <li>Publish</li>
    </ul>
  </li>
  <li>Deal with many deployment issues such as Swagger.</li>
</ul>