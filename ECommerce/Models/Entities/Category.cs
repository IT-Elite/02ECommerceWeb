using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ECommerce.Models
{

    public class Category
    {
        [Key]
        [Column(Order = 1)]
        public int ProductID { get; set; }

        [Key]
        [Column(Order = 2)]
        public string Keyword { get; set; }

    }

    public class KeywordList : List<String>

    {
        public List<String> keywordList = new List<String>();
        public List<String> FindKeyList(int? id)
        {
            SqlHelper dal = new SqlHelper();
            String sql = "Select keyword from CATEGORY where productID=" + id;
            DataTable dt = dal.ExecuteSql(sql);

            foreach (DataRow dr in dt.Rows)
            {

                String a = dr["keyword"].ToString();
                keywordList.Add(a);


            }

            return keywordList;

        }


    }

}