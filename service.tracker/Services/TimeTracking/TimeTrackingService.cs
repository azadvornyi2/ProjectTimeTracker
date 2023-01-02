using domain.tracker.DbConnectionFactory.Contracts;
using domain.tracker.Entitites.TimeTracking;
using domain.tracker.Repositories.TimeTracking.Contracts;
using service.tracker.Services.TimeTracking.Contracts;

namespace service.tracker.Services.TimeTracking
{
    public sealed class TimeTrackingService : ITimeTrackingService
    {
        private readonly IRegisteredTimeRepositrory _timeRepository;


        public TimeTrackingService(IRegisteredTimeRepositoryFactory timeRepositoryFactory,
            IDbConnectionFactory dbConnectionFactory)
        {
            _timeRepository = timeRepositoryFactory.NewRegisteredTimeRepository(
                dbConnectionFactory.NewSqlConnection());
        }
        
        public Task<TimeRegister> Get(Guid projectNetId) =>
            Task.Run(() =>
            _timeRepository.GetByNetId(projectNetId));

        public Task<IEnumerable<TimeRegister>> GetAll() =>
            Task.Run(() =>
            _timeRepository.GetAll());

        public Task<TimeRegister> Register(TimeRegister time) =>
            Task.Run(() =>
            {
                long timeId = _timeRepository.Register(time);
                return _timeRepository.GetById(timeId);
            });

        public Task Remove(Guid projectNetId) =>
            Task.Run(() => 
            _timeRepository.Remove(projectNetId));


        public Task<TimeRegister> Update(TimeRegister time) =>
            Task.Run(() =>
            {
                _timeRepository.Update(time);
                return _timeRepository.GetByNetId(time.NetUid);
            });
        

    }
}
