using domain.tracker.Entitites.TimeTracking;

namespace service.tracker.Services.TimeTracking.Contracts
{
    public interface ITimeTrackingService
    {
        Task<IEnumerable<TimeRegister>> Register(TimeRegister time);

        Task<IEnumerable<TimeRegister>> Update(TimeRegister time);

        Task<TimeRegister> Get(Guid projectNetId);

        Task<IEnumerable<TimeRegister>> GetAll();

        Task Remove(Guid projectNetId);
    }
}
