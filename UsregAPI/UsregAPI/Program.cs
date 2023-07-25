using UsregAPI.DAL.Context;
using UsregAPI.DAL.Repositories;
using UsregAPI.DAL.Repositories.Contracts;
using UsregAPI.Shared.Services;
using UsregAPI.Shared.Services.Contracts;

var builder = WebApplication.CreateBuilder(args);


//adding services
builder.Services.AddScoped<DapperContext>();
builder.Services.AddScoped<IUserRolesService, UserRolesService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
