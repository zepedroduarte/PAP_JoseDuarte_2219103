using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto;
using backend.Model;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Authorization;
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
        
        [HttpPost]
        [AllowAnonymous]
        public IActionResult CreateUser([FromBody] CreateUserDto user)
        { 
            IActionResult response = Unauthorized();

            User userCredentials = new User
            {
                UserFirebaseUid = user.FirebaseUid,
                UserName = user.UserName,
                UserEmail = user.Email,
                UserPhoneNumber = user.PhoneNumber,
                UserPhotoUrl = user.UserPhotoUrl,
                DistrictId = user.DistrictId,
            };

            long id = _connection.Insert(userCredentials);

            if(id > 0)
            {
                response = NoContent();
            }
            
            return response;
        }
    }
}
