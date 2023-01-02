using domain.tracker.DbConnectionFactory.Contracts;
using domain.tracker.Entitites.TimeTracking;
using domain.tracker.Repositories.TimeTracking.Contracts;
using service.tracker.Services.Reports.Contracts;

namespace service.tracker.Services.Reports
{
    public sealed class ReportService : IReportService
    {
        private readonly IRegisteredTimeRepositrory _timeRepository;

        public ReportService(IRegisteredTimeRepositoryFactory timeRepositoryFactory,
            IDbConnectionFactory dbConnectionFactory)
        {
            _timeRepository = timeRepositoryFactory.NewRegisteredTimeRepository(
                dbConnectionFactory.NewSqlConnection());
        }

        public Task<IEnumerable<TimeRegister>> OneProjectReport(Guid projectNetId) =>
            Task.Run(() =>
            _timeRepository.GetAllByProjectNetId(projectNetId));

        public Task<IEnumerable<TimeRegister>> OneProjectReportWithTimeFrames(Guid projectNetId, DateTime startDate, DateTime endDate) =>
            Task.Run(() => 
            _timeRepository.GetHoursRangeByOneProject(projectNetId, startDate, endDate));

        public Task<IEnumerable<TimeRegister>> ReportWithTimeFrames(DateTime startDate, DateTime endDate) =>
            Task.Run(() =>
            _timeRepository.GetHoursRange(startDate, endDate));
        
    }
}
