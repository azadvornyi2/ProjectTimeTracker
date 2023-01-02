using common.tracker.Helpers;
using domain.tracker.DbConnectionFactory.Contracts;
using Microsoft.Data.SqlClient;
using System.Data;

namespace domain.tracker.DbConnectionFactory
{
    public sealed class DbConnectionFactory : IDbConnectionFactory
    {
        public IDbConnection NewSqlConnection() =>
           new SqlConnection(ConfigurationManager.DatabaseConnectionString);
    }
}
