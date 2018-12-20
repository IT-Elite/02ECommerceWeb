using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Web;

namespace ECommerce.Models
{
    public class ImageURL
    {
        [Key]
        [Column(Order = 1)]
        public int ProductID { get; set; }

        [Key]
        [Column(Order = 2)]
        public string Image { get; set; }

    }

    public class ImageList : List<String>

    {
        public List<String> imageList = new List<String>();
        public List<String> FindIamgeList(int? id)
        {
            SqlHelper dal = new SqlHelper();
            String sql = "Select Image from ImageURL where ProductID=" + id;
            DataTable dt = dal.ExecuteSql(sql);

            foreach (DataRow dr in dt.Rows)
            {

                String a = dr["Image"].ToString();
                imageList.Add(a);


            }

            return imageList;

        }


    }
}
