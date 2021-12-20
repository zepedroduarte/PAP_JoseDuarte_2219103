using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IDbConnection _connection;
        private readonly IConfiguration _config;
        
        public UserController(IConfiguration config)
        {
            _config = config;
            _connection = new SqlConnection(_config.GetConnectionString(("KidsHeavenDB")));
        }
    }
}
