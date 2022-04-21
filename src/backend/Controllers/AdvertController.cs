﻿using System;
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
        public async Task<IActionResult> GetAdverts(int currentPageNumber)
        {
            int pagesize = 3;

            int skip = (currentPageNumber - 1) * pagesize;

            string uid = User.Claims.FirstOrDefault(x => x.Type == "user_id")?.Value;

            string getAdvert = @"
            SELECT ProductsId,
                   ProductsTitle, 
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
            WHERE KidsHeavenDB.UserAccounts.UserFirebaseUid = @uid
            ORDER BY ProductsTitle
            OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY";

            string count = @"SELECT COUNT(*) 
            FROM KidsHeavenDB.Products 
                JOIN KidsHeavenDB.UserAccounts ON KidsHeavenDB.Products.ProductsUserId = KidsHeavenDB.UserAccounts.UserId 
            WHERE KidsHeavenDB.UserAccounts.UserFirebaseUid = @uid";

            try
            {
                var reader =
                    await _connection.QueryAsync<GetAdvertDTO>(getAdvert,
                        new {Skip = skip, Take = pagesize, uid = uid});
                int totalCount = _connection.QueryAsync<int>(count, new {uid = uid}).Result.FirstOrDefault();

                Pagination<GetAdvertDTO> pagination = new Pagination<GetAdvertDTO>
                {
                    TotalCount = totalCount,
                    Data = reader,
                    PageSize = pagesize,
                    CurrentPageNumber = currentPageNumber
                };

                return Ok(pagination);
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
        [Authorize]
        public async Task<IActionResult> GetAdvertById(int id)
        {
            string getAdvert = @"
            SELECT ProductsTitle, 
                    ProductsDescription, 
                    ProductsEmail, 
                    ProductsPhoneNumber, 
                    KidsHeavenDB.MapLocations.MapLocationsLat,  
                    KidsHeavenDB.MapLocations.MapLocationsLng, 
                    ProductsPhotoUrl, 
                    ProductsPrice,
                    ProductsGender,
                    ProductsUserId, 
                    KidsHeavenDB.UserAccounts.UserPhotoUrl,
                    KidsHeavenDB.UserAccounts.UserName,
                    KidsHeavenDB.Categories.categoryName
            FROM KidsHeavenDB.Products 
                JOIN KidsHeavenDB.Categories ON KidsHeavenDB.Products.ProductsCategoryId = KidsHeavenDB.Categories.CategoryId 
                JOIN KidsHeavenDB.MapLocations ON KidsHeavenDB.Products.ProductsLocationId = KidsHeavenDB.MapLocations.Id 
                JOIN KidsHeavenDB.UserAccounts ON KidsHeavenDB.Products.ProductsUserId = KidsHeavenDB.UserAccounts.UserId
            WHERE KidsHeavenDB.Products.ProductsId = @id";

            try
            {
                var advertData = await _connection.QueryAsync<GetOneAdvertDTO>(getAdvert, new {id = id});
                return Ok(advertData.FirstOrDefault());
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

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAdvert(int id)
        {
            IActionResult response = Unauthorized();

            try
            {
                Advert advertData = new Advert()
                {
                    ProductsId = id,
                };

                bool wasUpdated = await _connection.DeleteAsync(advertData);

                if (wasUpdated)
                {
                    return Ok();
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
        public async Task<IActionResult> UpdateAdvert([FromBody] UpdateAdvertDTO advert, int id)
        {
            IActionResult response = Unauthorized();
            
            try
            {
                var advertId = await _connection.GetAsync<Advert>(id);

                var locationsId = await _connection.GetAsync<Locations>(advertId.ProductsLocationId);

                Locations locationsData = new Locations()
                {
                    Id = locationsId.Id,
                    MapLocationsLat = advert.lat,
                    MapLocationsLng = advert.lng,
                };
                
                bool wasUpdated = await _connection.UpdateAsync(locationsData);

                if (wasUpdated)
                {
                    Advert advertData = new Advert()
                    {
                        ProductsId = id,
                        ProductsTitle = advert.ProductsTitle,
                        ProductsGender = advert.ProductsGender,
                        ProductsDescription = advert.ProductsDescription,
                        ProductsEmail = advert.ProductsEmail,
                        ProductsPrice = advert.ProductsPrice,
                        ProductsCategoryId = advert.ProductsCategoryId,
                        ProductsLocationId = locationsData.Id,
                        ProductsPhoneNumber = advert.ProductsPhoneNumber,
                        ProductsPhotoUrl = advert.ProductsPhotoUrl,
                        ProductsUserId = advertId.ProductsUserId
                    };

                    bool advertWasUpdated = await _connection.UpdateAsync(advertData);

                    if (advertWasUpdated)
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
        
        [HttpGet("All")]
        [Authorize]
        public async Task<IActionResult> GetAllAdverts()
        {
            string getAdvert = @"
            SELECT ProductsTitle, 
                    ProductsDescription, 
                    ProductsEmail, 
                    ProductsPhoneNumber, 
                    KidsHeavenDB.MapLocations.MapLocationsLat,  
                    KidsHeavenDB.MapLocations.MapLocationsLng, 
                    ProductsPhotoUrl, 
                    ProductsPrice,
                    ProductsGender,
                    ProductsUserId, 
                    KidsHeavenDB.UserAccounts.UserPhotoUrl,
                    KidsHeavenDB.UserAccounts.UserName,
                    KidsHeavenDB.Categories.categoryName
            FROM KidsHeavenDB.Products 
                JOIN KidsHeavenDB.Categories ON KidsHeavenDB.Products.ProductsCategoryId = KidsHeavenDB.Categories.CategoryId 
                JOIN KidsHeavenDB.MapLocations ON KidsHeavenDB.Products.ProductsLocationId = KidsHeavenDB.MapLocations.Id 
                JOIN KidsHeavenDB.UserAccounts ON KidsHeavenDB.Products.ProductsUserId = KidsHeavenDB.UserAccounts.UserId";
            try
            {
                var advertData = await _connection.QueryAsync<GetOneAdvertDTO>(getAdvert);
                return Ok(advertData);
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