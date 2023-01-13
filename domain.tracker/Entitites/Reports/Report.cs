using domain.tracker.Entitites.TimeTracking;

namespace domain.tracker.Entitites.Reports
{
    public sealed class Report
    {
        public string ReportType { get; set; } = string.Empty;

        public string ProjectName { get; set; } = string.Empty;

        public string StartDate { get; set; } = string.Empty;

        public string EndDate { get; set; } = string.Empty;

        public IEnumerable<TimeRegister>? RegisteredTime { get; set; }
    }
}
