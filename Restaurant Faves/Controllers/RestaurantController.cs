using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurant_Faves.Models;
using System.Diagnostics.Metrics;
using static System.Reflection.Metadata.BlobBuilder;

namespace Restaurant_Faves.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        RestaurantDbContext _dbContext = new RestaurantDbContext();

        //[HttpGet]
        //public List<Order> GetOrder(string? restaurant, bool? orderAgain)
        //{
        //    List<Order> orders = new List<Order>();
        //    return _dbContext.Orders.ToList();
            //try
            //{

            //    orders = _dbContext.Orders.Where(o => o.Restaurant.ToLower().Trim().Contains(restaurant.ToLower().Trim())).ToList();

            //    if (orderAgain != null)
            //    {
            //        orders = orders.Where(o => o.OrderAgain == orderAgain).ToList();
            //    }
            //    if (orders.Count == 0)
            //    {
            //        //returns a 404 error
            //        return NotFound();
            //    }
            //    return Ok(orders);
            //}
            //catch (Exception ex)
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            //}
        //}

        //see line 7  [Route("api/[controller]")]
        //api/Restaurant
        //api/Restaurant?restaurant=Taco Bell
        //api/Restaurant?orderAgain=true
        //api/Restaurant?orderAgain=true&restaurant=Taco Bell
        [HttpGet]
        public List<Order> GetAll(string? restaurant = "", bool? _orderAgain = null)

        {
            //if user doesn't enter any parameters
            if (restaurant == null && _orderAgain == null)
            {
                return _dbContext.Orders.ToList();

            }
            //.Contains() does partial searching
            List<Order> Result = _dbContext.Orders.Where(o => o.Restaurant.Contains(restaurant)).ToList();
            if (_orderAgain != null)
            {
                Result = Result.Where(o => o.OrderAgain == _orderAgain).ToList();
            }
            return Result;
        }

        //api/Restaurant/1
        // ("{id}") adds it to the end of the URL
        [HttpGet("{id}")]
        public Order GetByID(int id)
        {
            //finds the id that you searched for, entity framework recognizes this
            return _dbContext.Orders.Find(id);
        }

        //api/Restaurant/Restaurant?restaurant=Taco Bell
        [HttpGet("Restaurnt")]
        public List<Order> GetByCategory(string restaurant)
        {
            return _dbContext.Orders.Where(i => i.Restaurant == restaurant).ToList();
        }

        //The order is specified as the JSON body of the request.
        //passes in the JSON object which comes through the body and into the code
        //api/Restaurant
        [HttpPost]
        public Order AddOrder([FromBody]Order newOrder)
        {
            _dbContext.Orders.Add(newOrder);
            _dbContext.SaveChanges();
            return newOrder;
        }


        //api/Restaurant/3
        [HttpPut("{id}")]
        public Order UpdateOrder(int id, [FromBody]Order updatedOrder)
        {
            Order b = _dbContext.Orders.Find(id);
            b = updatedOrder;
            //b.OrderDescription = updatedOrder.OrderDescription;
            //b.Restaurant = updatedOrder.Restaurant;
            //b.Rating = updatedOrder.Rating;
            //b.OrderAgain = updatedOrder.OrderAgain;

            _dbContext.Orders.Update(b); //updates the database
            _dbContext.SaveChanges();
            return b;
        }


        //api/Restaurant/5
        [HttpDelete("{id}")]
        public Order DeleteById(int id)
        {
            Order deleted = _dbContext.Orders.Find(id);
            _dbContext.Orders.Remove(deleted);
            _dbContext.SaveChanges();
            return deleted;
        }


    }
}
