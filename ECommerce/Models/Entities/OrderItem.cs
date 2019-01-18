using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ECommerce.Models
{
    public class OrderItem
    {
        [Key]
        [Column(Order = 1)]
        public int ProductID { get; set; }

        [Key]
        [Column(Order = 2)]
        public int OrderID { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public OrderItem()
        {

        }
        public OrderItem(int productID, int quantity)
        {
            this.ProductID = productID;
            this.Quantity = quantity;
            this.Price = new Product(productID).Price;
        }
        public OrderItem(int productID, int quantity, decimal price)
        {
            this.ProductID = productID;
            this.Quantity = quantity;
            this.Price = price;
        }

        public OrderItem(DataRow drOrderItem)
        {
            MapOrderItemProperties(drOrderItem);
        }

        private void MapOrderItemProperties(DataRow orderItemRow)
        {
            this.ProductID = (int)orderItemRow["productID"];
            this.OrderID = (int)orderItemRow["orderID"];
            this.Quantity = (int)orderItemRow["quantity"];
            this.Price = (decimal)orderItemRow["price"];
        }

        public int AddOrderItem()
        {
            try
            {
                SqlHelper dal = new SqlHelper();
                string SPName = "USP_AddOrderItem";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@ProductID", this.ProductID),
                    new SqlParameter("@OrderID", this.OrderID),
                    new SqlParameter("@Quantity", this.Quantity),
                    new SqlParameter("@Price", this.Price)
                };
                int rowsAffected = dal.NonqueryStoredProc(SPName, parameters);

                if (rowsAffected == 0)
                {
                    throw new Exception("Failed in Adding New OrderItem!");
                }

                return rowsAffected;
            }
            catch (Exception ex)
            {
                throw new Exception("OrderItem could not be Added!", ex);
            }
        }

    }

    public class OrderItemCollection : List<OrderItem>

    {
        public OrderItemCollection()
        {

        }
        public OrderItemCollection(int orderID)
        {
            SqlHelper dal = new SqlHelper();
            string sql = "Select * from [ORDERITEM] where [orderID]=" + orderID;
            DataTable dtOrderItems = dal.ExecuteSql(sql);

            foreach (DataRow drOrderItem in dtOrderItems.Rows)
            {
                OrderItem orderItem = new OrderItem(drOrderItem);

                this.Add(orderItem);
            }
        }
        public OrderItemCollection(string orderItemString)
        {
            char split1 = ',', split2 = ';';
            string str1 = ",", str2 = ";";
            if (orderItemString != null)
            {
                if (orderItemString.Contains(str2))
                {
                    string[] sArray1 = orderItemString.Split(split2);
                    foreach (string sitem in sArray1)
                    {
                        if (sitem.Contains(str1))
                        {
                            string[] sArray2 = sitem.Split(split1);
                            OrderItem item = new OrderItem();
                            item.ProductID = int.Parse(sArray2[0]);
                            item.Quantity = int.Parse(sArray2[1]);
                            item.Price = new Product(item.ProductID).Price;
                            this.Add(item);
                        }

                    }
                }
            }
        }
        public void AddOrderItems(int orderID, OrderItemCollection orderItems)
        {
            if (orderItems != null)
            {
                foreach (OrderItem orderItem in orderItems)
                {
                    orderItem.OrderID = orderID;
                    orderItem.AddOrderItem();
                }
            }
        }

    }
}