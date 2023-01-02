using domain.tracker.DbConnectionFactory.Contracts;
using domain.tracker.DbConnectionFactory;
using service.tracker.Services.Projects;
using service.tracker.Services.Projects.Contracts;
using service.tracker.Services.Reports;
using service.tracker.Services.Reports.Contracts;
using service.tracker.Services.TimeTracking;
using service.tracker.Services.TimeTracking.Contracts;
using ConfigurationManager = common.tracker.Helpers.ConfigurationManager;
using database.tracker;
using Microsoft.EntityFrameworkCore;
using common.tracker;
using domain.tracker.Repositories.Projects.Contracts;
using domain.tracker.Repositories.Projects;
using domain.tracker.Repositories.TimeTracking.Contracts;
using domain.tracker.Repositories.TimeTracking;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using common.tracker.ResponseBuilder.Contracts;
using common.tracker.ResponseBuilder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<IResponseFactory, ResponseFactory>();
builder.Services.AddScoped<ITimeTrackingService, TimeTrackingService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IReportService, ReportService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Allowed", builder =>
    {
        builder
            .WithOrigins("http://localhost:4202")
            .AllowAnyHeader()
            .AllowCredentials()
            .AllowAnyMethod();
    });
});

builder.Services.AddTransient<IProjectRepositoryFactory, ProjectRepositoryFactory>();
builder.Services.AddTransient<IRegisteredTimeRepositoryFactory, RegisteredTimeRepositoryFactory>();

builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
builder.Services.AddDbContext<BusinessContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString(ConnectionStringNames.DbConnectionString)));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("Allowed");

ConfigurationManager.SetAppSettingsProperties(app.Configuration);


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseSpa(spa =>
//{
//    spa.Options.SourcePath = "ClientApp";

//    if (!app.Environment.IsDevelopment())
//    {
//        spa.UseReactDevelopmentServer(npmScript: "start");
//    }
//});

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
