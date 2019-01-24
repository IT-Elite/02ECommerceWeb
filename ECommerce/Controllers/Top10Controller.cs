using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ECommerce.Models;

namespace ECommerce.Controllers
{
    public class Top10Controller : Controller
    {
        private Top10Collection Top10 = new Top10Collection();
        // GET: Top10
        public Top10Controller()
        {
            SqlHelper sqlHelper = new SqlHelper();
            DataTable dt = sqlHelper.ExecuteStoredProc("USP_TOP10");
        }
        public ActionResult Index()
        {
            
            return View(Top10);
        }
    }
    
}