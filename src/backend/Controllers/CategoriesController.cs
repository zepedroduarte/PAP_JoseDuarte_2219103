using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using backend.Model;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        
        private readonly IDbConnection _connection;
        private readonly IConfiguration _config;
        
        
        public CategoriesController(IConfiguration config)
        {
            _config = config;
            _connection = new SqlConnection(_config.GetConnectionString(("KidsHeavenDB")));
        }
        
        // GET
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                return Ok(await _connection.GetAllAsync<Categories>());
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}