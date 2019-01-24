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
    public class Top10
    {
        [Key]
        public int ProductID { get; set; }
        public int Sales { get; set; }

        public Top10(int? id) : base()
        {
            //SqlHelper dal = new SqlHelper();
            //String sql = "Select * from TOP10SELLER" ;
            //DataTable dt = dal.ExecuteSql(sql);
            //if (dt != null && dt.Rows.Count > 0)
            //{
            //    DataRow Top10Row = dt.Rows[0];

            //    MapTop10Properties(Top10Row);
            //}

        }
        private void MapTop10Properties(DataRow drTop10)
        {
        this.ProductID = int.Parse(drTop10["productID"].ToString());
        this.Sales = int.Parse(drTop10["sales"].ToString());
        }
        public Top10(DataRow drTop10): base()
        {
            MapTop10Properties(drTop10);
        }

    }
    public class Top10Collection : List<Top10>

    {
        public List<String> keywordList = new List<String>();
        public Top10Collection()
        {
            SqlHelper dal = new SqlHelper();
            string sql = "Select * from TOP10SELLER ORDER BY sales DESC";
            DataTable dtTop10 = dal.ExecuteSql(sql);

            foreach (DataRow dr in dtTop10.Rows)
            {
                //create a new instance of the current appointment row
                Top10 top10 = new Top10(dr);

                //add the appointment object to this collections' internal list
                this.Add(top10);
            }

        }
    }
}