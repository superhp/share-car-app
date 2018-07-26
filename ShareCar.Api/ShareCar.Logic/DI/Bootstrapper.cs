using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using ShareCar.Logic.Identity;
using ShareCar.Logic.Request_Logic;
using ShareCar.Logic.Ride_Logic;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Logic.DI
{
    public class Bootstrapper
    {
        public static IContainer AddRegistrationsToDIContainer(IServiceCollection services)
        {
            RegisterLogic(services);
            RegisterRepositories(services);

            var builder = new ContainerBuilder();
            builder.Populate(services);

            return builder.Build();
        }

        private static void RegisterLogic(IServiceCollection services)
        {
            services.AddSingleton<IJwtFactory, JwtFactory>();
            services.AddScoped<IIdentity, FacebookIdentity>();
            services.AddSingleton<IUserLogic, UserLogic>();
            services.AddSingleton<IRequestLogic, RequestLogic>();
            services.AddSingleton<IRideRepository, RideRepository>();
            services.AddSingleton<IRideLogic, RideLogic>();

            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IRequestQueries, RequestQueries>();

        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<Db.Repositories.IUserRepository, Db.Repositories.UserRepository>();
        }


    }
}