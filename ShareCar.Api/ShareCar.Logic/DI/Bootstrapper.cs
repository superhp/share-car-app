using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using ShareCar.Logic.RideRequest_Logic;
using ShareCar.Logic.User_Logic;
using ShareCar.Logic.Ride_Logic;
using ShareCar.Db.Repositories;
using ShareCar.Logic.Address_Logic;
using ShareCar.Logic.Route_Logic;

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
            services.AddSingleton<IRideRepository, RideRepository>();
            services.AddSingleton<IRouteRepository, RouteRepository>();
            services.AddSingleton<IPassengerRepository, PassengerRepository>();
            services.AddSingleton<IRideLogic, RideLogic>();
            services.AddSingleton<IRouteLogic, RouteLogic>();
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IRideRequestLogic, RideRequestLogic>();
            services.AddSingleton<IRideRequestRepository, RideRequestRepository>();
            services.AddSingleton<IUserLogic, UserLogic>();
            services.AddSingleton<IAddressRepository, AddressRepository>();
            services.AddSingleton<IAddressLogic, AddressLogic>();
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<Db.Repositories.IUserRepository, Db.Repositories.UserRepository>();
        }


    }
}