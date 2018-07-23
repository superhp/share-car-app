using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using ShareCar.Db.Repositories;
using ShareCar.Logic.Identity;
using ShareCar.Logic.DatabaseQueries;
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
            services.AddSingleton<IRideLogic, RideLogic>();
            services.AddSingleton<IUserQueries, UserQueries>();
            services.AddSingleton<IRideQueries, RideQueries>();

        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }


    }
}