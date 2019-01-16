using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
// add the following references
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Xml;

namespace ECommerce.Models

{
    /// <summary>
    /// provides easy to use date access methods for SQL Server datebase
    ///
    /// </summary>
    class SqlHelper
    {
        #region Private field variables
        private string connString;
        #endregion Private field variables


        #region Constructors

        public SqlHelper()
        {
            //get the connection string from the web.config file
            connString = ConfigurationManager.ConnectionStrings["ECommerceDBContext"].ConnectionString;
        }
        #endregion Constructors

        #region Data Access Methods
        /// <summary>
        /// Executes a string of SQL code and returns a result set
        /// </summary>
        /// <param name="sql">string of SQL code to execute</param>
        /// <returns>dataTable</returns>

        public DataTable ExecuteSql(string sql)
        {
            // create a connection object
            // get the SQL to excute from the parameter passed as input to this method
            try
            {
                SqlConnection conn = new SqlConnection(connString);
                SqlCommand cmd = new SqlCommand(sql, conn);

                //Open the database connection
                conn.Open();
                
                // Execute the SQL and return a dataReader. A dateReader is a Foward only, read only cursor.
            // which means we cant interate through it, we have put its contents into some iterable object, like a datetable.
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            //put the data into a Datatable
            DataTable datatable = new DataTable();
            datatable.Load(dataReader);
            return datatable;
            }
            catch (Exception )
            {
                
                throw;
            }
            
        }
        /// <summary>
        /// Excecutes a string of SQL code and return a result set, using an array of SqlParameter objects
        /// </summary>
        /// <param name="sql"> string of SQL code to execute</param>
        /// <param name="parameters"> array of SqlParameter objects.</param>
        /// <returns></returns>
        public DataTable ExecuteSql(string sql, SqlParameter[] parameters)
        {
            SqlConnection conn = new SqlConnection(connString);

            SqlCommand cmd = new SqlCommand(sql, conn);

            FillParameters(cmd, parameters);

            cmd.Connection.Open();
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            DataTable dataTable = new DataTable();
            dataTable.Load(dataReader);

            return dataTable;
        }
        /// <summary>
        /// Fills a SqlCommand with the supplied SqlParameters.
        /// </summary>
        /// <param name="cmd">the SqlCommand object to add parameters to.</param>
        /// <param name="parameters">array of sqlParameter objects.</param>
        private void FillParameters(SqlCommand cmd, SqlParameter[] parameters)
        {
            // loop through the parameters and add each one to the command object's parameter collection.
            //for(int i=0; i< parameters.Length; i++)
            //{
            //    cmd.Parameters.Add(parameters[i]);
            //    // this is an easier way to do the above...
            //}

            foreach (SqlParameter parameter in parameters)
            {
                cmd.Parameters.Add(parameter);
            }
        }

        public DataTable ExecuteStoredProc(string SPName)
        {
            // create a connection object
            // get the SQL to excute from the parameter passed as input to this method
            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(SPName, conn);
            //specify the commond type as Stored Procedure. The Default commandtype is "text' i.e. some sql

            cmd.CommandType = CommandType.StoredProcedure;

            //Open the database connection
            conn.Open();
            // Execute the SQL and return a dataReader. A dateReader is a Foward only, read only cursor.
            // which means we cant interate through it, we have put its contents into some iterable object, like a datetable.
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            //put the data into a Datatable
            DataTable datatable = new DataTable();
            datatable.Load(dataReader);
            return datatable;
        }
        #endregion Data Access Methods

        public DataTable ExecuteStoredProc(string SPName, SqlParameter[] parameters)
        {
            // create a connection object
            // get the SQL to excute from the parameter passed as input to this method
            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(SPName, conn);
            //specify the commond type as Stored Procedure. The Default commandtype is "text' i.e. some sql

            cmd.CommandType = CommandType.StoredProcedure;

            // Call the fillparameters method, passing it the command object and the array of parameters....

            FillParameters(cmd, parameters);

            //Open the database connection
            conn.Open();
            // Execute the SQL and return a dataReader. A dateReader is a Foward only, read only cursor.
            // which means we cant interate through it, we have put its contents into some iterable object, like a datetable.
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            //put the data into a Datatable
            DataTable datatable = new DataTable();
            datatable.Load(dataReader);
            return datatable;
        }
        /// <summary>
        /// Execute a non-query(insert, update, delete) from a string of SQL code
        /// </summary>
        /// <param name="sql">a string of SQL</param>
        /// <param name="paramters"> an array of SqlParameter</param>
        /// <returns>number of rows affected</returns>
        public int NonquerySql(string sql, SqlParameter[] paramters)
        {
            SqlConnection conn = new SqlConnection(connString);

            SqlCommand cmd = new SqlCommand(sql, conn);

            FillParameters(cmd, paramters);

            conn.Open();

            int rowsAffected = cmd.ExecuteNonQuery();

            //Close Connection
            conn.Close();

            return rowsAffected;
        }
        /// <summary>
        /// a non-query(insert, update, delete) from a stored procedure
        /// </summary>
        /// <param name="SPName">the name of the stored procedure to execute</param>
        /// <param name="paramters">an array of sqlParameter</param>
        /// <returns></returns>
        public int NonqueryStoredProc(string SPName, SqlParameter[] paramters)
        {
            SqlConnection conn = new SqlConnection(connString);

            SqlCommand cmd = new SqlCommand(SPName, conn);

            cmd.CommandType = CommandType.StoredProcedure;

            FillParameters(cmd, paramters);

            conn.Open();

            int rowsAffected = cmd.ExecuteNonQuery();

            //Close Connection
            conn.Close();

            return rowsAffected;
        }

        public int ExecuteScalar(string SPName, SqlParameter[] paramters)
        {
            SqlConnection conn = new SqlConnection(connString);

            SqlCommand cmd = new SqlCommand(SPName, conn);

            cmd.CommandType = CommandType.StoredProcedure;

            FillParameters(cmd, paramters);

            conn.Open();

            int result = Convert.ToInt32(cmd.ExecuteScalar());

            //Close Connection
            conn.Close();

            return result;
        }
    }
}
