using AutoMapper.Configuration;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;
        private readonly IJwtFactory _jwtFactory;

        public CognizantIdentity(IUserLogic userlogic, IOptions<SendGridSettings> sgSettings, UserManager<User> userManager, IJwtFactory jwtFactory)
        {
            _sgSettings = sgSettings.Value;
            _client = new SendGridClient(_sgSettings.APIKey);
            _userlogic = userlogic;
            _userManager = userManager;
            _jwtFactory = jwtFactory;
        }

        public async Task<string> SubmitVerificationCodeAsync(VerificationCodeSubmitData data)
        {
            string loginEmail = data.FacebookEmail == null ? data.GoogleEmail : data.FacebookEmail;
            UnauthorizedUserDto user = _userlogic.GetUnauthorizedUser(loginEmail);
            bool verified = _userlogic.UserVerified(data.FacebookEmail != null, loginEmail);
            string jwt = null;
            if (verified)
            {
                var localUser = await _userManager.FindByNameAsync(loginEmail);
                var jwtIdentity = _jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id);
                jwt = await _jwtFactory.GenerateEncodedToken(localUser.UserName, jwtIdentity);
            }

            return jwt;
        }


        public async Task SendVerificationCode(string cognizantEmail, string loginEmail)
        {
            int code = _userlogic.GetUnauthorizedUser(loginEmail).VerificationCode;
            var msg = new SendGridMessage();

            msg.SetFrom(new EmailAddress("edgar.reis447@gmail.com", "Share car"));

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
