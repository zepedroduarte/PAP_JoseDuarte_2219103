using System;
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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdvertController : ControllerBase
    {
        private readonly IDbConnection _connection;
        private readonly IConfiguration _config;
        
        public AdvertController(IConfiguration config)
        {
            _config = config;
            _connection = new SqlConnection(_config.GetConnectionString(("KidsHeavenDB")));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateAdvert([FromBody] CreateAdvertDTO advert)
        {
            IActionResult response = Unauthorized();

            Locations locationsData = new Locations()
            {
                MapLocationsLat = advert.lat,
                MapLocationsLng = advert.lng,
            };
            
            try
            {
                long locationsId = await _connection.InsertAsync(locationsData);

                if (locationsId > 0)
                {
                    Advert advertData = new Advert()
                    {
                        ProductsTitle = advert.ProductsTitle,
                        ProductsGender = advert.ProductsGender,
                        ProductsDescription = advert.ProductsDescription,
                        ProductsEmail = advert.ProductsEmail,
                        ProductsPrice = advert.ProductsPrice,
                        ProductsCategoryId = advert.ProductsCategoryId,
                        ProductsLocationId = locationsId,
                        ProductsPhoneNumber = advert.ProductsPhoneNumber,
                        ProductsPhotoUrl = advert.ProductsPhotoUrl,
                        ProductsUserId = advert.ProductsUserId
                    };
                
                    long id = await _connection.InsertAsync(advertData);
                
                    if (id > 0)
                    {
                        response = NoContent();
                    }
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
        public async Task<IActionResult> GetAdvert()
        {
            string uid = User.Claims.FirstOrDefault(x => x.Type == "user_id")?.Value;
            
            string getAdvert = @"
            SELECT ProductsTitle, 
                   ProductsGender, 
                   KidsHeavenDB.Categories.CategoryName, 
                   ProductsDescription, 
                   ProductsEmail, 
                   ProductsPhoneNumber, 
                   KidsHeavenDB.MapLocations.MapLocationsLat,  
                   KidsHeavenDB.MapLocations.MapLocationsLng, 
                   ProductsPhotoUrl, 
                   ProductsPrice, 
                   ProductsUserId 
            FROM KidsHeavenDB.Products 
                JOIN KidsHeavenDB.Categories ON KidsHeavenDB.Products.ProductsCategoryId = KidsHeavenDB.Categories.CategoryId 
                JOIN KidsHeavenDB.MapLocations ON KidsHeavenDB.Products.ProductsLocationId = KidsHeavenDB.MapLocations.Id 
                JOIN KidsHeavenDB.UserAccounts ON KidsHeavenDB.Products.ProductsUserId = KidsHeavenDB.UserAccounts.UserId 
            WHERE KidsHeavenDB.UserAccounts.UserFirebaseUid = @uid";

            try
            {
                var advert = await _connection.QueryAsync<GetAdvertDTO>(getAdvert, new {uid = uid});
                return Ok(advert);
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