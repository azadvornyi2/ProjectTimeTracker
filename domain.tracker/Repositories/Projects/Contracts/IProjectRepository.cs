using domain.tracker.Entitites.Projects;

namespace domain.tracker.Repositories.Projects.Contracts
{
    public interface IProjectRepository
    {
        long Add(Project project);

        void Update(Project project);

        Project GetByNetId(Guid netId);

        Project GetById(long projectId);

        IEnumerable<Project> GetAll();

        void Remove(Guid netId);


    }
}
