using database.tracker.MapConfigurations;
using domain.tracker.Entitites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.tracker.EntityMaps
{
    public abstract class EntityBaseMap<T> : EntityTypeConfiguration<T> where T : EntityBase
    {
        public override void Map(EntityTypeBuilder<T> entity)
        {
            entity.Property(e => e.Id).HasColumnName("ID");

            entity.Property(e => e.NetUid)
                .HasColumnName("NetUID")
                .HasDefaultValueSql("newid()");

            entity.Property(e => e.Created).HasDefaultValueSql("getutcdate()");

            entity.Property(e => e.Deleted).HasDefaultValueSql("0");
        }
    }
}
