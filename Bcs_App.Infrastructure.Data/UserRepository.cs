using Bcs_App.Domain.Core;
using Bcs_App.Domain.Interfaces;
using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bcs_App.Infrastructure.Data
{
    public class UserRepository : IUserRepository
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public User Create(User item)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Query<User>("sp_userInsert", new { item.Fio, item.Phone, item.Email, item.CityId }, commandType: CommandType.StoredProcedure);
            }
            return item;
        }
        
        public void Dispose()
        {

        }

        public User GetUser(int id)
        {
            User user = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                user = db.Query<User>("SELECT * FROM Users WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            List<User> users = new List<User>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                users = db.Query<User>("SELECT * FROM Users").ToList();
            }
            return users;
        }        
    }
}
