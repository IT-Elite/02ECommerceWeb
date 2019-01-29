using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ECommerce.Models;

namespace ECommerce.Controllers
{
    public class OrderController : Controller
    {
        private ECommerceDBContext db = new ECommerceDBContext();

        public ActionResult Index()
        {
            OrderCollection orders = new OrderCollection();
            return View(orders);
        }


        // GET: Order/GetOrder/5
        public ActionResult GetOrder(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Order order = new Order((int)id);
            if (order == null)
            {
                return HttpNotFound();
            }
            return View(order);
        }

        // GET: Order/AddOrder
        public ActionResult AddOrder()
        {
            // Read Order and Address Parameters
            string email = Request.QueryString["email"];
            string firstName = Request.QueryString["firstName"];
            string lastName = Request.QueryString["lastName"];
            string phoneNumber = Request.QueryString["mobile"];
            string street = Request.QueryString["address"];
            string city = Request.QueryString["city"];
            string state = Request.QueryString["state"];
            string postCode = Request.QueryString["zip"];
            bool payStatus = false;
            Address deliveryAddress = new Address(firstName, lastName, street, city, state, postCode, phoneNumber);
            OrderItemCollection orderItems = new OrderItemCollection();

            // Read OrderItems
            int count = 0;
            while (Request.QueryString["productID" + count] != null)
            {
                int productID = int.Parse(Request.QueryString["productID" + count]);
                int quantity = int.Parse(Request.QueryString["quantity" + count]);
                OrderItem orderItem = new OrderItem(productID, quantity);
                orderItems.Add(orderItem);
                count++;
            }

            if (count != 0)
            {
                Order order = new Order(email, payStatus, deliveryAddress, orderItems);
                order.OrderTime = DateTime.Now;

                // Add Order to the DataBase
                int orderID = order.AddNewOrder(order);

                // Send Confirmation Email
                string toEmail = order.Email;
                //string toEmail = "suorui2010@163.com";
                string emailBody = Email.EmailTemplate(order);
                //string emailBody = "Hello, this is a test email";
                string emailSubject = "Online Order " + order.OrderID;
                Email confirmemail = new Email(toEmail, emailBody, emailSubject);
                bool status = confirmemail.SendEmail();

                // Clear Cookies
                if (orderID != 0)
                {
                    if (Request.Cookies["email"] != null)
                    {
                        Response.Cookies["email"].Expires = DateTime.Now.AddDays(-1);
                    }
                    foreach (OrderItem item in orderItems)
                    {
                        if (Request.Cookies[item.ProductID.ToString()] != null)
                        {
                            Response.Cookies[item.ProductID.ToString()].Expires = DateTime.Now.AddDays(-1);
                        }
                    }
                }

                // Return OrderID to HttpCookie
                HttpCookie httpCookie = new HttpCookie("orderID", orderID.ToString());
                httpCookie.Expires = DateTime.MaxValue;
                Response.Cookies.Add(httpCookie);

                return Content("<script language='javascript' type='text/javascript'>alert('orderID:" + orderID + "');window.location.href='http://localhost:51670/src/index.html';</script>");
                //return Redirect("~/src/index.html");
            }
            else
            {
                return Content("<script language='javascript' type='text/javascript'>alert('No Products in Cart! Please Add Products before placing an Order');window.location.href='http://localhost:51670/src/index.html';</script>");
            }
        }



        // POST: Order/AddOrder
        [HttpPost]
        public ActionResult AddOrder(string id)
        {
            // Read Order and Address Parameters
            string email = Request.Form["email"];
            string firstName = Request.Form["firstName"];
            string lastName = Request.Form["lastName"];
            string phoneNumber = Request.Form["mobile"];
            string street = Request.Form["address"];
            string city = Request.Form["city"];
            string state = Request.Form["state"];
            string postCode = Request.Form["zip"];
            bool payStatus = false;
            Address deliveryAddress = new Address(firstName, lastName, street, city, state, postCode, phoneNumber);
            OrderItemCollection orderItems = new OrderItemCollection();

            // Read OrderItems
            int count = 0;
            while (Request.Form["productID" + count] != null)
            {
                int productID = int.Parse(Request.Form["productID" + count]);
                int quantity = int.Parse(Request.Form["quantity" + count]);
                OrderItem orderItem = new OrderItem(productID, quantity);
                orderItems.Add(orderItem);
                count++;
            }

            if (count != 0)
            {
                Order order = new Order(email, payStatus, deliveryAddress, orderItems);
                order.OrderTime = DateTime.Now;

                // Add Order to the DataBase
                int orderID = order.AddNewOrder(order);

                // Send Confirmation Email
                string toEmail = order.Email;
                //string toEmail = "suorui2010@163.com";
                string emailBody = Email.EmailTemplate(order);
                //string emailBody = "Hello, this is a test email";
                string emailSubject = "Online Order " + order.OrderID;
                Email confirmemail = new Email(toEmail, emailBody, emailSubject);
                bool status = confirmemail.SendEmail();

                // Clear Cookies
                if (orderID != 0)
                {
                    if (Request.Cookies["email"] != null)
                    {
                        Response.Cookies["email"].Expires = DateTime.Now.AddDays(-1);
                    }
                    foreach (OrderItem item in orderItems)
                    {
                        if (Request.Cookies[item.ProductID.ToString()] != null)
                        {
                            Response.Cookies[item.ProductID.ToString()].Expires = DateTime.Now.AddDays(-1);
                        }
                    }
                }

                // Return OrderID to HttpCookie
                HttpCookie httpCookie = new HttpCookie("orderID", orderID.ToString());
                httpCookie.Expires = DateTime.MaxValue;
                Response.Cookies.Add(httpCookie);

                return Content("<script language='javascript' type='text/javascript'>alert('orderID:" + orderID + "');window.location.href='http://localhost:51670/src/index.html';</script>");
                //return Redirect("~/src/index.html");
            }
            else
            {
                return Content("<script language='javascript' type='text/javascript'>alert('No Products in Cart! Please Add Products before placing an Order');window.location.href='http://localhost:51670/src/index.html';</script>");
            }
        }


        //public ActionResult AddOrder(Order order)
        //{
        //    int orderID = 0;
        //    if (ModelState.IsValid)
        //    {
        //        if (System.Text.RegularExpressions.Regex.IsMatch(order.OrderItemsString, "^[0-9,;]+$"))
        //        {
        //            order.OrderItems = new OrderItemCollection(order.OrderItemsString);
        //        }
        //        order.OrderTime = DateTime.Now;
        //        orderID = order.AddNewOrder(order);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(orderID);
        //}


        //// GET: Order/Details/5
        //public ActionResult Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Order order = new Order((int)id);
        //    if (order == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(order);
        //}

        //// GET: Order/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: Order/Create
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        ////[HttpPost]
        ////[ValidateAntiForgeryToken]
        ////public ActionResult Create([Bind(Include = "OrderID,Email,OrderTime,PayStatus,OrderItemsString")] Order order)
        ////{
        ////    if (ModelState.IsValid)
        ////    {
        ////        db.Orders.Add(order);
        ////        db.SaveChanges();
        ////        return RedirectToAction("Index");
        ////    }

        ////    return View(order);
        ////}

        //// GET: Order/Edit/5
        //public ActionResult Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Order order = db.Orders.Find(id);
        //    if (order == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(order);
        //}

        //// POST: Order/Edit/5
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include = "OrderID,Email,OrderTime,PayStatus,OrderItemsString")] Order order)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(order).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(order);
        //}

        //// GET: Order/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Order order = db.Orders.Find(id);
        //    if (order == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(order);
        //}

        //// POST: Order/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public ActionResult DeleteConfirmed(int id)
        //{
        //    Order order = db.Orders.Find(id);
        //    db.Orders.Remove(order);
        //    db.SaveChanges();
        //    return RedirectToAction("Index");
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}
    }

}

