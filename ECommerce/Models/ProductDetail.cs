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

        public ProductDetail(Product product, Category category)
        {
            this.ProductID = product.ProductID;
            this.ProductName = product.ProductName;
            this.Description = product.Description;
            this.Price = product.Price;
             

        }
      


        public IEnumerable<Product> Product { get; set; }
        public IEnumerable<Category> Category { get; set; }
        public ProductDetail()
        {
            ECommerceDBContext db = new ECommerceDBContext();
            this.Product = db.Products.ToList();
            this.Category = db.Category.ToList();
        }

     

    }
}