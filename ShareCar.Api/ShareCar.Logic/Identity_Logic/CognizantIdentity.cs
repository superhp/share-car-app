using AutoMapper.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using ShareCar.Db.Entities;
using ShareCar.Dto;
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
        private readonly SendGridClient _client;
        private readonly SendGridSettings  _sgSettings;

        public CognizantIdentity(IUserLogic userlogic, IOptions<SendGridSettings> sgSettings)
        {
            _sgSettings = sgSettings.Value;
            _client = new SendGridClient(_sgSettings.APIKey);
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

            msg.SetFrom(new EmailAddress("no-reply@cognizant.com", "Share car"));

            var recipients = new List<EmailAddress>
            {
                new EmailAddress("edgar.reis@cognizant.com")
            };
            msg.AddTos(recipients);

            msg.SetSubject("Verification code");

            msg.AddContent(MimeType.Text, "Your verification code is " + code.ToString());

            var response = await _client.SendEmailAsync(msg);
        }
    }
}
