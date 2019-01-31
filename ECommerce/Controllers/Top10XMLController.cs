using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ECommerce.Controllers
{
    public class Top10XMLController : ApiController
    {
        public IEnumerable<USP_TOP10XML_Result> Get()
        {
            using (ECommerceEntities_Top10XML entities = new ECommerceEntities_Top10XML())
            {
                return entities.USP_TOP10XML().ToList();

            }
        }
    }
}
