using domain.tracker.Entitites.Reports;
using domain.tracker.Entitites.TimeTracking;

namespace service.tracker.Services.Reports.Contracts
{
    public interface IReportService
    {
        Task<Report> OneProjectReport(Guid projectNetId);

        Task<Report> OneProjectReportWithTimeFrames(Guid projectNetId, DateTime startDate, DateTime endDate);

        Task<Report> ReportWithTimeFrames(DateTime startDate, DateTime endDate);
    }
}
