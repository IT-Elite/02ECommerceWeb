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
            return View();
        }

        // POST: Order/AddOrder
        [HttpPost, ActionName("AddOrder")]
        [ValidateAntiForgeryToken]
        public ActionResult AddOrder(Order order)
        {
            int orderID = 0;
            if (ModelState.IsValid)
            {
                if (System.Text.RegularExpressions.Regex.IsMatch(order.OrderItemsString, "^[0-9,;]+$"))
                {
                    order.OrderItems = new OrderItemCollection(order.OrderItemsString);
                }
                order.OrderTime = DateTime.Now;
                orderID = order.AddNewOrder(order);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(orderID);
        }


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

