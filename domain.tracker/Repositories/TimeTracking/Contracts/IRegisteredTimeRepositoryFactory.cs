using System.Data;

namespace domain.tracker.Repositories.TimeTracking.Contracts
{
    public interface IRegisteredTimeRepositoryFactory
    {
        IRegisteredTimeRepositrory NewRegisteredTimeRepository(IDbConnection connection);
    }
}
