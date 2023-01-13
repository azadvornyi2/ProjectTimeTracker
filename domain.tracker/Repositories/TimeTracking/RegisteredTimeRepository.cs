using Dapper;
using domain.tracker.Entitites.Projects;
using domain.tracker.Entitites.TimeTracking;
using domain.tracker.Repositories.TimeTracking.Contracts;
using System.Data;

namespace domain.tracker.Repositories.TimeTracking
{
    public sealed class RegisteredTimeRepository : IRegisteredTimeRepositrory
    {
        private readonly IDbConnection _connection;

        public RegisteredTimeRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public IEnumerable<TimeRegister> GetAll() =>
            _connection.Query<TimeRegister>(
                "SELECT [RegisteredTime].*," +
                "[Project].Name AS [ProjectName], " +
                "DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) AS [Duration] " +
                "FROM [RegisteredTime] " +
                "LEFT JOIN [Project] ON " +
                "[Project].ID = [RegisteredTime].ProjectId " +
                "AND [Project].Deleted = 0 " +
                "WHERE [RegisteredTime].Deleted = 0 " +
                "ORDER BY [RegisteredTime].ENDS DESC ");

        public TimeRegister GetById(long id) =>
            _connection.Query<TimeRegister>(
                "SELECT *, " +
                "DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) [Duration] " +
                "FROM [RegisteredTime] " +
                "WHERE [RegisteredTime].Id = @Id " +
                "AND [RegisteredTime].Deleted = 0 ", new
                {
                    Id = id
                }).Single();

        public TimeRegister GetByNetId(Guid netId) =>
            _connection.Query<TimeRegister>(
                "SELECT *, " +
                "DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) [Duration] " +
                "FROM [RegisteredTime] " +
                "WHERE [RegisteredTime].Id = @NetId " +
                "AND [RegisteredTime].Deleted = 0 ", new
                {
                    NetId = netId
                }).Single();

        public long Register(TimeRegister time) =>
            _connection.Query<long>(
                "INSERT INTO [RegisteredTime] " +
                "([Updated], [Starts], [Ends], [ProjectId], [Notes]) " +
                "VALUES " +
                "(GETUTCDATE(), @Starts, @Ends, @ProjectId, @Notes); " +
                "SELECT SCOPE_IDENTITY() ", time).Single();

        public void Remove(Guid netId) =>
            _connection.Execute(
                "UPDATE [RegisteredTime] " +
                "SET [RegisteredTime].Deleted = 1 " +
                "WHERE [RegisteredTime].NetUID = @NetId", new
                {
                    NetId = netId
                });

        public void Update(TimeRegister time) =>
            _connection.Execute(
                "UPDATE [RegisteredTime] " +
                "SET [RegisteredTime].Updated = GETUTCDATE(), " +
                "[RegisteredTime].Starts = @Starts, " +
                "[RegisteredTime].Ends = @Ends, " +
                "[RegisteredTime].ProjectId = @ProjectId, " +
                "[RegisteredTime].Notes = @Notes, " +
                "[RegisteredTime].Deleted = @Deleted " +
                "WHERE [RegisteredTime].ID = @Id ", time);

        public IEnumerable<TimeRegister> GetAllByProjectNetId(Guid projectnetId) =>
           _connection.Query<TimeRegister>(
               "SELECT [RegisteredTime].*, " +
               "DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) as [Duration]," +
               "[Project].Name AS [ProjectName] " +
               "FROM [RegisteredTime] " +
               "LEFT JOIN [Project] ON " +
               "[Project].ID = [RegisteredTime].ProjectId " +
               "AND [Project].Deleted = 0 " +
               "WHERE [Project].NetUID = @NetId " +
               "AND [RegisteredTime].Deleted = 0 ",
               new { NetId = projectnetId }
               );

        public IEnumerable<TimeRegister> GetHoursRangeByOneProject(Guid projectnetId, DateTime start, DateTime end) =>
            _connection.Query<TimeRegister>(
               "SELECT [RegisteredTime].*, " +
               "DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) [Duration], " +
               "[Project].Name AS [ProjectName] " +
               "FROM [RegisteredTime] " +
               "LEFT JOIN [Project] ON " +
               "[Project].ID = [RegisteredTime].ProjectId " +
               "AND [Project].Deleted = 0 " +
               "WHERE [Project].NetUID = @NetId " +
               "AND [RegisteredTime].Starts >= @Start " +
               "AND [RegisteredTime].Ends <= @End " +
               "AND [RegisteredTime].Deleted = 0 ",
               new
               {
                   NetId = projectnetId,
                   Start = start,
                   End = end
               });

        public IEnumerable<TimeRegister> GetHoursRange(DateTime start, DateTime end) =>
            _connection.Query<TimeRegister>(
               "SELECT [RegisteredTime].*, " +
               "DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) [Duration], " +
               "[Project].Name AS [ProjectName] " +
               "FROM [RegisteredTime] " +
               "LEFT JOIN [Project] ON " +
               "[Project].ID = [RegisteredTime].ProjectId " +
               "AND [Project].Deleted = 0 " +
               "WHERE [RegisteredTime].Starts >= @Start " +
               "AND [RegisteredTime].Ends <= @End " +
               "AND [RegisteredTime].Deleted = 0 ",
               new
               {
                   Start = start,
                   End = end
               });
    }
}
