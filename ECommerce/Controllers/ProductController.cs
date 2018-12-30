using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ECommerce.Controllers
{
    public class ProductController : ApiController
    {
        public IEnumerable<USP_GetProductDetails_Result> GetAllProducts()
        {
            using (ECommerceEntities entities = new ECommerceEntities())
            {
                return entities.USP_GetProductDetails("").ToList();

            }
        }
        public IEnumerable<USP_GetProductDetails_Result> GetProductById(int id)
        {
            using (ECommerceEntities entities = new ECommerceEntities())
            {
                return entities.USP_GetProductDetails(id.ToString()).ToList();
            }
        }

        public IEnumerable<USP_GetProductbyCategory_Result> GetProductByCategory(String id)
        {
            using (ECommerceEntities entities = new ECommerceEntities())
            {
                return entities.USP_GetProductbyCategory(id).ToList();
            }
        }

        public IEnumerable<string> GetAllCategory()
        {
            using (ECommerceEntities entities = new ECommerceEntities())
            {
                return entities.USP_GetALLCategory().ToList();
            }
        }
    }
}
