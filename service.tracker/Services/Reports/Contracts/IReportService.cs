using domain.tracker.Entitites.TimeTracking;

namespace service.tracker.Services.Reports.Contracts
{
    public interface IReportService
    {
        Task<IEnumerable<TimeRegister>> OneProjectReport(Guid projectNetId);

        Task<IEnumerable<TimeRegister>> OneProjectReportWithTimeFrames(Guid projectNetId, DateTime startDate, DateTime endDate);

        Task<IEnumerable<TimeRegister>> ReportWithTimeFrames(DateTime startDate, DateTime endDate);
    }
}
