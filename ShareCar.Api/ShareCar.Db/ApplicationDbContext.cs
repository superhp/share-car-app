using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Entities;

namespace ShareCar.Db
{
    public class ApplicationDbContext : IdentityDbContext<UserAutentification>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}