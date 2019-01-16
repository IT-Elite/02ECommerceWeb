using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace ECommerce.Models
{
    public class ECommerceDBContext : DbContext
    {

        public DbSet<Product> Products { get; set; }

        public System.Data.Entity.DbSet<ECommerce.Models.Order> Orders { get; set; }
    }   
}