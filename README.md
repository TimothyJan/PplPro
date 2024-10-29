# PplPro
Employee Management System with Angular (frontend), ASP.NET Core (backend), and SQL (database).

Process:
<ul>
  <li>Set up Azure SQL Database
    <ul>
      <li>Create SQL database, and get connection string.</li>
      <li>Configure firewall settings(add local machine's IP address)</li>
      <li>Get Connection String.</li>
    </ul>
  </li>
  <li>
    <ul>Configure ASP.NET Core to Connect to Azure SQL Database
      <li>Add Connection String to appsettings.json.</li>
      <li>Create Employee model, database context, and model repository.
        <ul>
          <li>DbContext is used for querying data, tracking changes, saving data and managing relationships.</li>
          <li>Repository layer is a design pattern that abstracts and centralizes data access logic, providing a clean separation between the data layer and the business logic, improving maintainability, flexibility, and testability.</li>
        </ul>
      </li>
      <li>Register the DbContext in Startup.cs.</li>
      <li>Run Database Migrations.
        <ul>
          <li>Tools -> NuGet Package Manager -> Package Manager Console.</li>
          <li>~<code>Add-Migration InitialCreate</code> too add initial migrations. Generate a migration file in a folder called Migrations. The file contains the SQL schema changes required to create tables and relationships based on your models.</li>
          <li>~<code>Update-Database</code> will use the connection string in appsettings.json to connect to the Azure SQL Database and apply the schema changes defined in the migration.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Implement CRUD Operations with Entity Framework.</li>
  <li>Set Up Angular Frontend to Communicate with the API.</li>
</ul>