using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using backend.Model;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistrictController : Controller
    {
        
        private readonly IDbConnection _connection;
        private readonly IConfiguration _config;
        
        
        public DistrictController(IConfiguration config)
        {
            _config = config;
            _connection = new SqlConnection(_config.GetConnectionString(("KidsHeavenDB")));
        }
        
        // GET
        [HttpGet]
        public async Task<IActionResult> GetDistricts()
        {
            return Ok(await _connection.GetAllAsync<Districts>());
        }
    }
}