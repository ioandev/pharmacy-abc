using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Consultation> Consultations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Consultation>()
                .HasOne(i => i.Patient)
                .WithMany(c => c.Consultations)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
