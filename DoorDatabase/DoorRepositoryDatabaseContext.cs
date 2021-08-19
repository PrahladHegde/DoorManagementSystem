using Microsoft.EntityFrameworkCore;

namespace DoorManagementSystem.DoorDatabase
{
    public class DoorRepositoryDatabaseContext : DbContext
    {
        public DoorRepositoryDatabaseContext(DbContextOptions<DoorRepositoryDatabaseContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<DoorRecord> Doors { get; set; }
    }
}
