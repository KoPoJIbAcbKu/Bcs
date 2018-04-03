using Bcs_App.Domain.Core;
using System;
using System.Collections.Generic;

namespace Bcs_App.Domain.Interfaces
{
    public interface IUserRepository : IDisposable
    {
        IEnumerable<User> GetUsers();
        User GetUser(int id);
        User Create(User item);
    }
}


