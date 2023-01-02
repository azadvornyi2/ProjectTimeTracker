using System.Data;

namespace domain.tracker.Repositories.Projects.Contracts
{
    public interface IProjectRepositoryFactory
    {
        IProjectRepository NewProjectRepositrory(IDbConnection connection);
    }
}
