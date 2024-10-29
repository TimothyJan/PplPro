using Microsoft.EntityFrameworkCore;
using PplPro.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register your DbContext here
builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSqlDb")));

// Register the IEmployeeRepository and its implementation
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy => policy.WithOrigins("http://localhost:4200") // Adjust as needed
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Other service registrations
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

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

app.Run();
