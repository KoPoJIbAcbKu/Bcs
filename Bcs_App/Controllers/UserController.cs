using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dapper;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Bcs_App.Domain.Core;
using Bcs_App.Domain.Interfaces;
using Bcs_App.Infrastructure.Data;

namespace Bcs_App.Controllers
{
    public class UserController : Controller
    {
        IUserRepository context;

        public UserController()
        {
            context = new UserRepository();
        }

        public ActionResult Index()
        {
            ViewBag.Users = context.GetUsers();
            return View();
        }

        [HttpPost]
        public JsonResult Create(User user)
        {
            if (ModelState.IsValid)
            {
                context.Create(user);
                return Json(new { State = "success", data = user });
            }
            else
            {
                var list = new Dictionary<string,object>();
                foreach (var key in ModelState.Keys)
                {
                    list.Add(key, ModelState[key].Errors);
                }
                return Json(new { state = "error", errors = list, data = user });
            }
        }
    }
}