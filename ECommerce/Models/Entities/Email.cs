using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Helpers;
using System.Text;

namespace ECommerce.Models
{
    public class Email
    {
        [DataType(DataType.EmailAddress), Display(Name = "To")]
        [Required]
        public string ToEmail { get; set; }
        [Display(Name = "Body")]
        [DataType(DataType.MultilineText)]
        public string EMailBody { get; set; }
        [Display(Name = "Subject")]
        public string EmailSubject { get; set; }
        [DataType(DataType.EmailAddress)]
        [Display(Name = "CC")]
        public string EmailCC { get; set; }
        [DataType(DataType.EmailAddress)]
        [Display(Name = "BCC")]
        public string EmailBCC { get; set; }

        public Email(string toEmail, string emailBody, string emailSubject)
        {
            this.ToEmail = toEmail;
            this.EMailBody = emailBody;
            this.EmailSubject = emailSubject;
        }
        public bool SendEmail()
        {
            string FromEmail = "ecommerce2019.elite@gmail.com";
            string FromPassword = "ecommerce12345";
            try
            {
                //Configuring webMail class to send emails  
                //gmail smtp server  
                WebMail.SmtpServer = "smtp.gmail.com";
                //gmail port to send emails  
                WebMail.SmtpPort = 587;
                WebMail.SmtpUseDefaultCredentials = true;
                //sending emails with secure protocol  
                WebMail.EnableSsl = true;
                //EmailId used to send emails from application  
                WebMail.UserName = FromEmail;
                WebMail.Password = FromPassword;

                //Sender email address.  
                WebMail.From = FromEmail;

                //Send email  
                WebMail.Send(to: this.ToEmail, subject: this.EmailSubject, body: this.EMailBody, cc: this.EmailCC, bcc: this.EmailBCC, isBodyHtml: true);
                //ViewBag.Status = "Email Sent Successfully.";
                return true;
            }
            catch (Exception)
            {
                //ViewBag.Status = "Problem while sending email, Please check details.";
                return false;
            }
        }

        public static string EmailTemplate(Order order)
        {
            StringBuilder body = new StringBuilder();
            body.AppendLine("<p>Dear " + order.DeliveryAddress.FirstName + ",</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>Thank you for your recent order " + order.OrderID + ".</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>We kindly request that you provide the below information within the next 24 hours to enable us to continue processing your order.</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>Please reply to this email and include a copy of:</p>");
            body.AppendLine("<p>1.     The Credit Card used to place the order masking all digits on your credit card, except for the first six and last four digits on the card. Please also ensure the full name and expiry date is clearly visible.</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>2.     Valid photo ID such as a driver’s licence, passport or other Proof of Age card/Photo Card (approved by an Australian State/Territory Government). Please ensure the document number is masked and the full name and address details (if available) are clearly visible.</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>All information will be handled in line with our Privacy Policy available at https://www.davidjones.com/information/privacy-and-security</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>Please ensure you send the information within the timeframe specified above to ensure your order is not delayed or cancelled.</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>  Issued To:</p>");
            body.AppendLine("<p>  " + order.DeliveryAddress.FirstName + " " + order.DeliveryAddress.LastName + "</p>");
            body.AppendLine("<p>Order Date: " + order.OrderTime.Date.ToString("dd/MM/yyyy") + "</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>Product / Description: </p>");
            body.AppendLine("<p></p>");
            decimal sum = 0;
            foreach (OrderItem item in order.OrderItems)
            {
                Product product = new Product(item.ProductID);
                body.AppendLine("<p>" + product.ProductName + "   $" + product.Price * item.Quantity + " </p>");
                body.AppendLine("<p>Unit Price: $" + product.Price + " | Quantity: " + item.Quantity + "</p>");
                body.AppendLine("<p></p>");
                sum += product.Price * item.Quantity;
            }
            body.AppendLine("<p>Order Total:  $" + sum + "</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>Your address</p>");
            body.AppendLine("<p>" + order.DeliveryAddress.FirstName + " " + order.DeliveryAddress.LastName + "</p>");
            body.AppendLine("<p>" + order.DeliveryAddress.Street + "</p>");
            body.AppendLine("<p>" + order.DeliveryAddress.City + " " + order.DeliveryAddress.PostCode + " " + order.DeliveryAddress.State + "</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>Kind regards</p>");
            body.AppendLine("<p></p>");
            body.AppendLine("<p>XXXXXXX Online Customer Service</p>");
            return body.ToString();
        }

    }
}