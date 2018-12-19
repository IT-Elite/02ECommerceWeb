using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Web;

namespace ECommerce.Models
{
    public class ECommerceDBContext : DbContext
    {

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Category
        { get; set; }

        public ProductDetail GetDetails(int id)
        {

            
        }
       
    }
}