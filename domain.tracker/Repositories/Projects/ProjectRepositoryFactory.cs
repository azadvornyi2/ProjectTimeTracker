using domain.tracker.Repositories.Projects.Contracts;
using System.Data;

namespace domain.tracker.Repositories.Projects
{
    public sealed class ProjectRepositoryFactory : IProjectRepositoryFactory
    {
        public IProjectRepository NewProjectRepositrory(IDbConnection connection) =>
            new ProjectRepository(connection);
       
    }
}
