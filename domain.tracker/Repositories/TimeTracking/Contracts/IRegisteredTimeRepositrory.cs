using domain.tracker.Entitites.TimeTracking;

namespace domain.tracker.Repositories.TimeTracking.Contracts
{
    public interface IRegisteredTimeRepositrory
    {
        long Register(TimeRegister time);

        void Update(TimeRegister time);

        IEnumerable<TimeRegister> GetAllByProjectNetId(Guid projectnetId);

        IEnumerable<TimeRegister> GetHoursRangeByOneProject(Guid projectnetId, DateTime start, DateTime end);

        IEnumerable<TimeRegister> GetHoursRange(DateTime start, DateTime end);

        TimeRegister GetByNetId(Guid netId);

        TimeRegister GetById(long id);

        IEnumerable<TimeRegister> GetAll();

        void Remove(Guid netId);
    }
}
