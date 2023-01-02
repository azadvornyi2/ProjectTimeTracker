using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace domain.tracker.Entitites
{
    public abstract class EntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public Guid NetUid { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public bool Deleted { get; set; }

        public virtual bool IsNew() => Id.Equals(0);
    }
}
