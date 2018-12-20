using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.Models
{
    public class ProductDetail { 
      public int ProductID { get; set; }
    public string ProductName { get; set; }
    public String Description { get; set; }
    public decimal Price { get; set; }
    public List<string> Keyword { get; set; }
     public List<string> Image { get; set; }




        public ProductDetail(Product product, List<String> keyword, List<String> Image)
        {
            this.ProductID = product.ProductID;
            this.ProductName = product.ProductName;
            this.Description = product.Description;
            this.Price = product.Price;
            this.Keyword = keyword;
            this.Image = Image;
             

        }
      



    }
}