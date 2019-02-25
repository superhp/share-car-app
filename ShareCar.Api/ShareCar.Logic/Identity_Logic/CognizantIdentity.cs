using AutoMapper.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
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
        public IConfiguration Configuration { get; }
        private readonly IUserLogic _userlogic;
        private readonly SendGridClient _client;

        public CognizantIdentity(IUserLogic userlogic, IConfiguration configuration)
        {
            Configuration = configuration;
            var apiKey = "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";
            _client = new SendGridClient(apiKey);
            _userlogic = userlogic;
        }

        public bool SubmitVerificationCode(VerificationCodeSubmitData data)
        {
            UnauthorizedUserDto user = _userlogic.GetUnauthorizedUser(data.FacebookEmail == null ? data.GoogleEmail : data.FacebookEmail);

            return data.VerificationCode == user.VerificationCode;
        }


        public async Task SendVerificationCode(string email, int code)
        {



            var msg = new SendGridMessage();

            msg.SetFrom(new EmailAddress("no-reply@cognizantchallenge.lt", "Cognizant Challenge"));

            var recipients = new List<EmailAddress>
            {
                new EmailAddress("edgar.reis@cognizant.com")
            };
            msg.AddTos(recipients);
       //     msg.AddBcc("laurynas.simkunas@cognizant.com");

            msg.SetSubject("Login details to CognizantChallenge.lt");

            msg.AddContent(MimeType.Text, "Hi," +
                                          "" +
                                          "Your login details to http://cognizantchallenge.lt is:" +
                                          $"Email: {email}" +
                                          "" +
                                          "The website will be activated before exam." +
                                          "" +
                                          "Regards," +
                                          "Cognizant Challenge");
            msg.AddContent(MimeType.Html, $"Hi,<br><br>Your login details to <a href='http://cognizantchallenge.lt'>http://cognizantchallenge.lt</a> is: <br> Email: {email}<br>Password: <br><br>The website will be activated before exam.<br><br>Regards,<br>Cognizant Challenge");

            var response = await _client.SendEmailAsync(msg);
        }
    }
}
