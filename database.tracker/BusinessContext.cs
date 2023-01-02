using database.tracker.EntityMaps.Projects;
using database.tracker.EntityMaps.TimeTracking;
using database.tracker.MapConfigurations;
using domain.tracker.Entitites.Projects;
using domain.tracker.Entitites.TimeTracking;
using Microsoft.EntityFrameworkCore;

namespace database.tracker
{
    public sealed class BusinessContext : DbContext
    {
        public BusinessContext(DbContextOptions<BusinessContext> options)
            : base(options) { }

        public DbSet<Project> Project { get; set; }

        public DbSet<TimeRegister> TimeRegister { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.AddConfiguration(new ProjectMap());

            builder.AddConfiguration(new TimeRegisterMap());
        }
    }
}
