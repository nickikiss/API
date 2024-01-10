using Microsoft.EntityFrameworkCore;
using TODOapi.Models;

namespace TODOapi.Data
{
    public class ApiContext : DbContext
    {

        public DbSet<Job> Jobs { get; set; }   
        public ApiContext(DbContextOptions<ApiContext> options) 
            :base(options) 
        
        { 
        
        } 

    }
}
 