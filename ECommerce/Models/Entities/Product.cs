using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using ECommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace ECommerce.Models
{
  
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public String Description { get; set; }
        public decimal Price { get; set; }

        public Product (int? id) : base()
        {
            SqlHelper dal = new SqlHelper();
            String sql = "Select * from Product where productID="+id;
            DataTable dt = dal.ExecuteSql(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                DataRow productRow = dt.Rows[0];

                MapProductProperties(productRow);
            }

        }
        public Product(DataRow drProduct) : base()
        {
            MapProductProperties(drProduct);

        }

        private void MapProductProperties(DataRow drProduct)
        {
            this.ProductID = int.Parse(drProduct["productID"].ToString());
            this.ProductName= drProduct["name"].ToString();
            this.Description= drProduct["description"].ToString();
            this.Price= decimal.Parse(drProduct["price"].ToString());
        }
    }
  
  
  public class ProductCollection : List<Product>

    {
        public List<String> keywordList = new List<String>();
        public ProductCollection()
        {
            SqlHelper dal = new SqlHelper();
            String sql = "Select * from PRODUCT";
            DataTable dt = dal.ExecuteSql(sql);

        foreach (DataRow dr in dt.Rows)
        {
            //create a new instance of the current appointment row
            Product product = new Product(dr);

            //add the appointment object to this collections' internal list
            this.Add(product);
        }

       
        }




    }


    }


  
