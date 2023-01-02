using Dapper;
using domain.tracker.Entitites.Projects;
using domain.tracker.Repositories.Projects.Contracts;
using System.Data;

namespace domain.tracker.Repositories.Projects
{
    public sealed class ProjectRepository : IProjectRepository
    {
        private readonly IDbConnection _connection;

        public ProjectRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public long Add(Project project) =>
            _connection.Query<long>(
                "INSERT INTO [Project] " +
                "([Updated], [Name], [Description]) " +
                "VALUES " +
                "(GETUTCDATE(), @Name, @Description); " +
                "SELECT SCOPE_IDENTITY()", project)
            .Single();

        public IEnumerable<Project> GetAll() =>
            _connection.Query<Project>(
                "SELECT * FROM [Project] " +
                "WHERE [Project].Deleted = 0 ");

        public Project GetById(long projectId) =>
            _connection.Query<Project>(
                "SELECT * FROM [Project]" +
                "Where [Project].ID = @ProjectId", new
                { 
                    ProjectId = projectId
                }).Single();

        public Project GetByNetId(Guid netId) =>
             _connection.Query<Project>(
                "SELECT * " +
                "FROM [Project] " +
                "WHERE [Project].NetUID = @NetId " +
                "AND [Project].Deleted = 0",
                new { NetId = netId }
            ).Single();

        public void Remove(Guid netId) =>
            _connection.Execute(
                "UPDATE [Project] " +
                "SET [Project].Deleted = 0 " +
                "WHERE [Project].NetUID = @NetId",
                new {NetId = netId });
       
        public void Update(Project project) =>
            _connection.Execute(
                "UPDATE [Project] " +
                "SET [Project].Updated = GETUTCDATE(), " +
                "[Project].Name = @Name, " +
                "[Project].Description = @Description, " +
                "[Project].Deleted = @Deleted " +
                "WHERE [Project].Id = @Id ",
                project);
    }
}
