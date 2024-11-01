using Microsoft.EntityFrameworkCore;
using PplPro.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Fetch connection string from environment variable or configuration
var connectionString = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTION")
                   ?? builder.Configuration.GetConnectionString("AzureSqlDb");

// Register DbContext with retry policy for transient fault handling
builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer(connectionString ?? throw new InvalidOperationException("Connection string not found."),
        sqlOptions => sqlOptions.EnableRetryOnFailure()));

// Register repositories and services for dependency injection
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy => policy.WithOrigins("https://127.0.0.1:4200") // Adjust as needed
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Add other services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

// Seed initial data for departments, roles, and employees
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<EmployeeDbContext>();

    // Apply any pending migrations and seed data
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }

    // Call the SeedData initializer with the service provider
    SeedData.Initialize(services);
}

app.Run();
