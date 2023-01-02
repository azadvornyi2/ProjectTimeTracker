using domain.tracker.Entitites.TimeTracking;

namespace domain.tracker.Entitites.Projects
{
    public sealed class Project : EntityBase
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ICollection<TimeRegister> TimeRegisters { get; set; }
    }
}
