using domain.tracker.Entitites.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.tracker.EntityMaps.Projects
{
    public sealed class ProjectMap : EntityBaseMap<Project>
    {
        public override void Map(EntityTypeBuilder<Project> entity)
        {
            base.Map(entity);

            entity.ToTable("Project");

            entity.Property(e => e.Name).HasMaxLength(50);

            entity.Property(e => e.Description).HasMaxLength(450);
            
        }
    }
}
