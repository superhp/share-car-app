using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Cognizant;
using ShareCar.Logic.User_Logic;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.Identity_Logic
{
    public class CognizantIdentity : ICognizantIdentity
    {
        private readonly IUserLogic _userlogic;

        public CognizantIdentity(IUserLogic userlogic)
        {
            _userlogic = userlogic;
        }

        public bool SubmitVerificationCode(VerificationCodeSubmitData data)
        {
            UnauthorizedUserDto user = _userlogic.GetUnauthorizedUser(data.FacebookEmail == null ? data.GoogleEmail : data.FacebookEmail);

            return data.VerificationCode == user.VerificationCode;
        }

      public async Task SubmitCognizantEmailAsync(CognizantData cogzniantData)
        {
            UnauthorizedUserDto unauthorizedUser = _userlogic.GetUnauthorizedUser(cogzniantData.FacebookEmail == null ? cogzniantData.GoogleEmail : cogzniantData.FacebookEmail);

            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com", // set your SMTP server name here
                Port = 587, // Port 
                EnableSsl = true,
                Credentials = new NetworkCredential("from@gmail.com", "password")
            };

            using (var message = new MailMessage("from@gmail.com", "to@mail.com")
            {
                Subject = "Subject",
                Body = unauthorizedUser.VerificationCode.ToString()
            })
            
                await smtpClient.SendMailAsync(message);
            
        }

    }
}
