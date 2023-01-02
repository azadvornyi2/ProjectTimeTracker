using domain.tracker.DbConnectionFactory.Contracts;
using domain.tracker.Entitites.Projects;
using domain.tracker.Repositories.Projects.Contracts;
using service.tracker.Services.Projects.Contracts;

namespace service.tracker.Services.Projects
{
    public sealed class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepositoryFactory projectRepositoryFactory,
            IDbConnectionFactory dbConnectionFactory)
        {
            _projectRepository = projectRepositoryFactory.NewProjectRepositrory(
                dbConnectionFactory.NewSqlConnection());
        }

        public Task<IEnumerable<Project>> Add(Project project) =>
            Task.Run(() =>
            {
                long projectId = _projectRepository.Add(project);
                return _projectRepository.GetAll();
            });

        public Task<Project> Get(Guid projectNetId) =>
            Task.Run(() =>
            _projectRepository.GetByNetId(projectNetId));

        public Task<IEnumerable<Project>> GetAll() =>
            Task.Run(() =>
            _projectRepository.GetAll());

        public Task Remove(Guid projectNetId) =>
            Task.Run(() =>
            _projectRepository.Remove(projectNetId));

        public Task<IEnumerable<Project>> Update(Project project) =>
            Task.Run(() =>
            {
                _projectRepository.Update(project);
                return _projectRepository.GetAll();
            });

    }
}
