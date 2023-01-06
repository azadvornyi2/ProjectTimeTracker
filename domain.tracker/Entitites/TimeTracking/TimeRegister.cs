using domain.tracker.Entitites.Projects;

namespace domain.tracker.Entitites.TimeTracking
{
    public sealed class TimeRegister : EntityBase
    {
        public DateTime Starts { get; set; }

        public DateTime Ends { get; set; }

        public int Duration { get; set; }

        public long ProjectId { get; set; }

        public string ProjectName { get; set; } = string.Empty;

        public string? Notes { get; set; }

        public Project Project { get; set; }
    }
}
