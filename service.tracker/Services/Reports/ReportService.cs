using domain.tracker.DbConnectionFactory.Contracts;
using domain.tracker.Entitites.Reports;
using domain.tracker.Entitites.TimeTracking;
using domain.tracker.Repositories.Projects.Contracts;
using domain.tracker.Repositories.TimeTracking.Contracts;
using Microsoft.IdentityModel.Tokens;
using service.tracker.Services.Reports.Contracts;

namespace service.tracker.Services.Reports
{
    public sealed class ReportService : IReportService
    {
        private readonly IRegisteredTimeRepositrory _timeRepository;
        private readonly IProjectRepository _projectRepository;

        public ReportService(IRegisteredTimeRepositoryFactory timeRepositoryFactory,
            IProjectRepositoryFactory projectRepositoryFactory,
            IDbConnectionFactory dbConnectionFactory)
        {
            _timeRepository = timeRepositoryFactory.NewRegisteredTimeRepository(
                dbConnectionFactory.NewSqlConnection());

            _projectRepository = projectRepositoryFactory.NewProjectRepositrory(
                dbConnectionFactory.NewSqlConnection());
        }

        public Task<Report> OneProjectReport(Guid projectNetId) =>
            Task.Run(() =>
            {
                Report report = new Report();

                report.ReportType = "All the time on the project";
                report.RegisteredTime = _timeRepository.GetAllByProjectNetId(projectNetId);
                if (!report.RegisteredTime.IsNullOrEmpty())
                {
                    report.StartDate = DateOnly.FromDateTime(report.RegisteredTime.Min(t => t.Starts)).ToString();
                    report.EndDate = DateOnly.FromDateTime(report.RegisteredTime.Max(t => t.Ends)).ToString();
                }
                else
                {
                    report.StartDate = "--/--/----";
                    report.EndDate = "--/--/----";
                }    
                report.ProjectName = _projectRepository.GetByNetId(projectNetId).Name;

                return report;
            });

        public Task<Report> OneProjectReportWithTimeFrames(Guid projectNetId, DateTime startDate, DateTime endDate) =>
            Task.Run(() =>
            {
                Report report = new Report();

                report.ReportType = "By one project with time frames";
                report.RegisteredTime = _timeRepository.GetHoursRangeByOneProject(projectNetId, startDate, endDate);
                report.StartDate = DateOnly.FromDateTime(startDate).ToString();
                report.EndDate = DateOnly.FromDateTime(endDate).ToString();
                report.ProjectName = _projectRepository.GetByNetId(projectNetId).Name;

                return report;
            });

        public Task<Report> ReportWithTimeFrames(DateTime startDate, DateTime endDate) =>
            Task.Run(() =>
            {
                Report report = new Report();

                report.ReportType = "All projects with time frames";
                report.RegisteredTime = _timeRepository.GetHoursRange(startDate, endDate);
                report.StartDate = DateOnly.FromDateTime(startDate).ToString();
                report.EndDate = DateOnly.FromDateTime(endDate).ToString();
                report.ProjectName = "All projects";

                return report;
            });

    }
}
