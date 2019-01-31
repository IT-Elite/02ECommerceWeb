using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ECommerce
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Route1",
                routeTemplate: "api/Top10XML",
                defaults: new { controller = "Top10XML", action = "Get" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { controller = "Product", action = "GetAllProducts", id = RouteParameter.Optional }
            );
        }
    }
}
