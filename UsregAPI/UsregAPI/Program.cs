using UsregAPI.DAL.Context;
using UsregAPI.DAL.Repositories;
using UsregAPI.DAL.Repositories.Contracts;
using UsregAPI.Shared.Services;
using UsregAPI.Shared.Services.Contracts;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

string  corsSpecifications = "_corsSpecifications";

//CORS handling
builder.Services.AddCors(options => {
	options.AddPolicy(name: corsSpecifications,
		builder =>
		{
			builder.WithOrigins("http://localhost:4200")
			  .AllowAnyHeader()
			  .AllowAnyMethod();
		});
});


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

app.UseCors(corsSpecifications);

app.UseAuthorization();

app.MapControllers();

app.Run();
