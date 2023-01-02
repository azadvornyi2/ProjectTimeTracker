using domain.tracker.Entitites.Projects;

namespace service.tracker.Services.Projects.Contracts
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> Add(Project project);

        Task<IEnumerable<Project>> Update(Project project);

        Task<Project> Get(Guid projectNetId);

        Task<IEnumerable<Project>> GetAll();

        Task Remove(Guid projectNetId);
    }
}
