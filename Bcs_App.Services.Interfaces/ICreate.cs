using Bcs_App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bcs_App.Services.Interfaces
{
    public interface ICreate
    {
        void CreateUser(User user);
    }
}
