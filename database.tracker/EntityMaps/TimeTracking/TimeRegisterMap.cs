using domain.tracker.Entitites.TimeTracking;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.tracker.EntityMaps.TimeTracking
{
    public sealed class TimeRegisterMap : EntityBaseMap<TimeRegister>
    {
        public override void Map(EntityTypeBuilder<TimeRegister> entity)
        {
            base.Map(entity);

            entity.ToTable("RegisteredTime");

            entity.Property(e => e.Starts);
            entity.Property(e => e.Ends);

            entity.Ignore(e => e.Duration);

            entity.HasOne(e => e.Project)
                .WithMany(e => e.TimeRegisters)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
