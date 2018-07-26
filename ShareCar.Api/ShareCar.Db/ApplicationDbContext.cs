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
        public DbSet<Request> Requests { get; set; }
     //   public DbSet<AtomicRequest> AtomicRequests { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Passenger>().HasKey(x => new { x.Email, x.RideId });
        }
    }
}