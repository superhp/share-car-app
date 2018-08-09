using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Entities;

namespace ShareCar.Db
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<User> User { get; set; }
        public DbSet<Ride> Rides { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Passenger>()
                .HasKey(x => x.PassengerId);
            modelBuilder.Entity<Route>()
                .HasIndex(u => u.Geometry)
                .IsUnique();
            modelBuilder.Entity<Ride>()
                .Property(x => x.NumberOfSeats)
                .HasDefaultValue(4);
            modelBuilder.Entity<Ride>()
                .Property(x => x.isActive)
                .HasDefaultValue(true);


        }
    }
}