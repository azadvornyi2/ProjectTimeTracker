using domain.tracker.Repositories.TimeTracking.Contracts;
using System.Data;

namespace domain.tracker.Repositories.TimeTracking
{
    public sealed class RegisteredTimeRepositoryFactory : IRegisteredTimeRepositoryFactory
    {
        public IRegisteredTimeRepositrory NewRegisteredTimeRepository(IDbConnection connection) =>
            new RegisteredTimeRepository(connection);
        
    }
}
