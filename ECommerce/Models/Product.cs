using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using ECommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models
{
  
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public String Description { get; set; }
        public decimal Price { get; set; }

       




    }

  

   
}
