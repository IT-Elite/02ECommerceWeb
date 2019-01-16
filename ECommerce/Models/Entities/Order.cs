using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ECommerce.Models;

namespace ECommerce.Models
{
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public string Email { get; set; }
        public DateTime OrderTime { get; set; }
        public bool PayStatus { get; set; }
        public Address DeliveryAddress { get; set; }
        //public OrderItem CartItem { get; set; }
        public string OrderItemsString { get; set; }
        public OrderItemCollection OrderItems { get; set; }


        public Order()
        {
            this.DeliveryAddress = new Address();
            //this.CartItem = new OrderItem();
            this.OrderItems = new OrderItemCollection();
        }
        public Order(string email, bool payStatus, Address devliveryAddress, OrderItemCollection orderItems)
        {
            this.Email = email;
            this.OrderTime = DateTime.Now;
            this.PayStatus = payStatus;
            this.DeliveryAddress = devliveryAddress;
            this.OrderItems = orderItems;
            this.OrderItemsString = this.CollectionToString(this.OrderItems);
        }

        public Order(string email, DateTime orderTime, bool payStatus, Address devliveryAddress, OrderItemCollection orderItems)
        {
            this.Email = email;
            this.OrderTime = orderTime;
            this.PayStatus = payStatus;
            this.DeliveryAddress = devliveryAddress;
            this.OrderItems = orderItems;
            this.OrderItemsString = this.CollectionToString(this.OrderItems);
        }
        public Order(int orderID)
        {
            SqlHelper dal = new SqlHelper();
            string sql = "Select * from [ORDER] where [orderID]=" + orderID;
            DataTable dt = dal.ExecuteSql(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                DataRow orderRow = dt.Rows[0];

                MapOrderProperties(orderRow);
                this.DeliveryAddress = new Address(orderID);
                this.OrderItems = new OrderItemCollection(orderID);
                this.OrderItemsString = this.CollectionToString(this.OrderItems);
            }

        }
        public Order(DataRow drOrder)
        {
            MapOrderProperties(drOrder);
            this.DeliveryAddress = new Address(this.OrderID);
            this.OrderItems = new OrderItemCollection(this.OrderID);
            this.OrderItemsString = this.CollectionToString(this.OrderItems);
        }

        private void MapOrderProperties(DataRow drOrder)
        {
            this.OrderID = (int)drOrder["orderID"];
            this.Email = drOrder["email"].ToString();
            this.PayStatus = (bool)drOrder["payStatus"];
            this.OrderTime = (DateTime)drOrder["orderTime"];
        }

        private string CollectionToString(OrderItemCollection orderItems)
        {
            string str1 = ",", str2 = ";";
            string orderItemString = null;
            if (orderItems != null)
            {
                foreach (OrderItem item in orderItems)
                {
                    orderItemString += item.ProductID + str1 + item.Quantity + str2;
                }
            }
            return orderItemString;
        }
        public int AddNewOrder(Order order)
        {
            try
            {
                SqlHelper dal = new SqlHelper();
                string SPName = "USP_AddOrder";

                SqlParameter[] parameters =
                {
                    new SqlParameter("@Email", this.Email),
                    new SqlParameter("@PayStatus", this.PayStatus),
                    new SqlParameter("@OrderTime", this.OrderTime)
                };

                //int rowsAffected = dal.NonqueryStoredProc(SPName, parameters);
                this.OrderID = dal.ExecuteScalar(SPName, parameters);

                //if (rowsAffected == 0)
                //{
                //    throw new Exception("Failed in Adding New Order!");
                //}
                this.OrderItems.AddOrderItems(this.OrderID, this.OrderItems);
                this.DeliveryAddress.AddDeveliveryAddress(this.OrderID, this.DeliveryAddress);
                this.OrderItemsString = this.CollectionToString(this.OrderItems);
                return this.OrderID;
            }
            catch (Exception ex)
            {
                throw new Exception("Order could not be Added!", ex);
            }
        }
    }

    public class OrderCollection : List<Order>

    {
        public OrderCollection()
        {
            SqlHelper dal = new SqlHelper();
            string sql = "Select * from [ORDER]";
            DataTable dtOrder = dal.ExecuteSql(sql);

            if (dtOrder != null && dtOrder.Rows.Count > 0)
            {
                foreach (DataRow drOrder in dtOrder.Rows)
                {
                    Order order = new Order(drOrder);

                    this.Add(order);
                }
            }

        }
    }
}


