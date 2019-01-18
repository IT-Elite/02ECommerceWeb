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
    public class Address
    {
        [Key]
        public int OrderID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostCode { get; set; }
        public string PhoneNumber { get; set; }

        public Address()
        {

        }
        public Address(string firstName, string lastName, string street, string city, string state, string postCode, string phoneNumber)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Street = street;
            this.City = city;
            this.State = state;
            this.PostCode = postCode;
            this.PhoneNumber = phoneNumber;
        }
        public Address(int orderID)
        {
            SqlHelper dal = new SqlHelper();
            string sql = "Select * from [DELIVERYADDRESS] where [orderID]=" + orderID;
            DataTable dtAddress = dal.ExecuteSql(sql);
            if (dtAddress != null && dtAddress.Rows.Count > 0)
            {
                DataRow drAddress = dtAddress.Rows[0];

                MapAddressProperties(drAddress);
            }
        }

        private void MapAddressProperties(DataRow drAddress)
        {
            this.OrderID = (int)drAddress["orderID"];
            this.FirstName = drAddress["firstName"].ToString();
            this.LastName = drAddress["lastName"].ToString();
            this.Street = drAddress["street"].ToString();
            this.City = drAddress["city"].ToString();
            this.State = drAddress["state"].ToString();
            this.PostCode = drAddress["postCode"].ToString();
            this.PhoneNumber = drAddress["phoneNumber"].ToString();
        }

        public int AddDeveliveryAddress(int orderID, Address address)
        {
            this.OrderID = orderID;
            try
            {
                SqlHelper dal = new SqlHelper();
                string SPName = "USP_AddDeliveryAddress";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@OrderID", this.OrderID),
                    new SqlParameter("@FirstName", this.FirstName),
                    new SqlParameter("@LastName", this.LastName),
                    new SqlParameter("@Street", this.Street),
                    new SqlParameter("@City", this.City),
                    new SqlParameter("@State", this.State),
                    new SqlParameter("@PostCode", this.PostCode),
                    new SqlParameter("@PhoneNumber", this.PhoneNumber)
                };
                int rowsAffected = dal.NonqueryStoredProc(SPName, parameters);

                if (rowsAffected == 0)
                {
                    throw new Exception("Failed in Adding New Delivery Address!");
                }

                return rowsAffected;
            }
            catch (Exception ex)
            {
                throw new Exception("Delivery Address could not be Added!", ex);
            }
        }
    }
}