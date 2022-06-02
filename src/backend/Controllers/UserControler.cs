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
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto user)
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

            try
            {
                long id = await _connection.InsertAsync(userCredentials);

                if (id > 0)
                {
                    response = NoContent();
                }

                return response;
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
        
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO user, int id)
        { 
            IActionResult response = Unauthorized();

            var userData = await _connection.GetAsync<User>(id);

            User userCredentials = new User
            {
                UserId = id,
                UserFirebaseUid = userData.UserFirebaseUid,
                UserName = user.UserName,
                UserEmail = user.Email,
                UserPhoneNumber = user.PhoneNumber,
                UserPhotoUrl = user.UserPhotoUrl,
                DistrictId = user.DistrictId,
            };
 
            try
            {
                bool wasUpdated = await _connection.UpdateAsync(userCredentials);
                
                if (wasUpdated)
                {
                    return Ok(wasUpdated);
                }

                return response;
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
        
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            string uid = User.Claims.FirstOrDefault(x => x.Type == "user_id")?.Value;

            string getUser = @"
            SELECT UserId, 
                   UserFirebaseUid, 
                   UserName, 
                   UserEmail, 
                   UserPhoneNumber, 
                   UserPhotoUrl, 
                   KidsHeavenDB.Districts.DistrictName, 
                   DistrictId 
            FROM KidsHeavenDB.UserAccounts 
                JOIN KidsHeavenDB.Districts on KidsHeavenDB.UserAccounts.DistrictId = KidsHeavenDB.Districts.DistrictsId 
            WHERE UserFirebaseUid = @uid";

            try
            {
                var user = await _connection.QueryAsync<UserInfoDTO>(getUser, new {uid = uid});
                return Ok(user.FirstOrDefault());
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
        
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserById(int id)
        {
            string getUser = @"
            SELECT UserId, 
                   UserFirebaseUid, 
                   UserName, 
                   UserEmail, 
                   UserPhoneNumber, 
                   UserPhotoUrl, 
                   KidsHeavenDB.Districts.DistrictName, 
                   DistrictId 
            FROM KidsHeavenDB.UserAccounts 
                JOIN KidsHeavenDB.Districts on KidsHeavenDB.UserAccounts.DistrictId = KidsHeavenDB.Districts.DistrictsId 
            WHERE UserId = @Id";

            try
            {
                var user = await _connection.QueryAsync<UserInfoDTO>(getUser, new {Id = id});
                return Ok(user.FirstOrDefault());
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
        
           
        [HttpPost("ratings")]
    
        public async Task<IActionResult> UserRateUser([FromBody] Rating rating)
        {

            Rating ratings = new Rating()
            {
                RatedUserStars = rating.RatedUserStars,
                UserIdEvaluated = rating.UserIdEvaluated,
                UserIdRated = rating.UserIdRated
            };

            try
            {
                long id = await _connection.InsertAsync(ratings);

                return Ok(id);
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
        
            
        [HttpPut("ratings")]
        [Authorize]
        public async Task<IActionResult> UserUpdateRateUser([FromBody] Rating rating)
        { 
            IActionResult response = Unauthorized();

            Rating ratings = new Rating()
            {
                RatedUserStars = rating.RatedUserStars,
                UserIdEvaluated = rating.UserIdEvaluated,
                UserIdRated = rating.UserIdRated
            };

            try
            {
                bool wasUpdated = await _connection.UpdateAsync(ratings);

                if (wasUpdated)
                {
                    response = NoContent();
                }

                return response;
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
        
        [HttpGet("ratings/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserRatingById(int id)
        {
            string getUserRating = @"
                SELECT ROUND(AVG(CAST(KidsHeavenDB.UserRateUser.RatedUserStars AS FLOAT)), 1) 
                AS RatedUserStars
                FROM KidsHeavenDB.UserRateUser 
                WHERE UserRateUser.UserIdEvaluated = @Id
            ";

            try
            {
                var ratings = await _connection.QueryAsync(getUserRating, new {Id = id});
                return Ok(ratings.FirstOrDefault());
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
        
         
        [HttpGet("userRating")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserRatingByUserId(int userEvaluatedId, int userRateId)
        {
            string getUserRating = @"
                SELECT KidsHeavenDB.UserRateUser.RatedUserStars, UserRateUser.UserIdRated 
                FROM KidsHeavenDB.UserRateUser 
                WHERE UserRateUser.UserIdEvaluated = @UserEvaluatedId AND UserRateUser.UserIdRated = @UserRateId
            ";

            try
            {
                var ratings = await _connection.QueryAsync(getUserRating, new {UserEvaluatedId = userEvaluatedId, UserRateId = userRateId});
                return Ok(ratings.FirstOrDefault());
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
