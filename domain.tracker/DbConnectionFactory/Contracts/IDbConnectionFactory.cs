using System.Data;

namespace domain.tracker.DbConnectionFactory.Contracts
{
    public interface IDbConnectionFactory
    {
        IDbConnection NewSqlConnection();
    }
}
