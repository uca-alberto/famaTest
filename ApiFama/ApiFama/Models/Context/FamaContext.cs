using ApiFama.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiFama.Models.Context
{
    public class FamaContext : DbContext
    {
        public FamaContext(DbContextOptions<FamaContext> options) : base(options)
        {

        }
        public DbSet<CivilStatus> CivilStatus { get; set; }
        public DbSet<CustomerDetailInfos> CustomerDetailInfos { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<PersonTypes> PersonTypes { get; set; }
    }
}
