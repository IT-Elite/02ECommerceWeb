﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ECommerce
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class ECommerceEntities : DbContext
    {
        public ECommerceEntities()
            : base("name=ECommerceEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CATEGORY> CATEGORies { get; set; }
        public virtual DbSet<IMGURL> IMGURLs { get; set; }
        public virtual DbSet<PRODUCT> PRODUCTs { get; set; }
    
        public virtual ObjectResult<string> USP_GetALLCategory()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("USP_GetALLCategory");
        }
    
        public virtual ObjectResult<USP_GetProductbyCategory_Result> USP_GetProductbyCategory(string keyword)
        {
            var keywordParameter = keyword != null ?
                new ObjectParameter("keyword", keyword) :
                new ObjectParameter("keyword", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USP_GetProductbyCategory_Result>("USP_GetProductbyCategory", keywordParameter);
        }
    
        public virtual ObjectResult<USP_GetProductDetails_Result> USP_GetProductDetails(string productID)
        {
            var productIDParameter = productID != null ?
                new ObjectParameter("productID", productID) :
                new ObjectParameter("productID", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USP_GetProductDetails_Result>("USP_GetProductDetails", productIDParameter);
        }
    }
}
