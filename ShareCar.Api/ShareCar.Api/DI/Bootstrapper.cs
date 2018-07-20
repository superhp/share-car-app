using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using ShareCar.Db.Repositories;
using ShareCar.Logic.Identity;
using ShareCar.Db.DatabaseQueries;
namespace ShareCar.Api.DI
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
            services.AddSingleton<IUserDatabase, UserDatabaseQueries>();
            services.AddSingleton<IRideDatabase, RideDatabaseQueries>();

        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }


    }
}