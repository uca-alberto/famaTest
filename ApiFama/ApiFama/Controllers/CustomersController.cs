using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiFama.Models.Context;
using ApiFama.Models.Entities;
using ApiFama.Models.Map;
using System.Net;
using ApiFama.Utilities;
using System.Xaml.Permissions;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Cors;

namespace ApiFama.Controllers
{
    [EnableCors("SiteCorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly FamaContext _context;

        public CustomersController(FamaContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        /// <summary>
        /// Get all records customer
        /// </summary>
        /// <returns>IEnumerable<CustomerMap></returns>
        [EnableCors("AllowOrigin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomersMap>>> GetCustomers()
        {
            try
            {
                var listCustomer = new List<CustomersMap>();
                var customers = await _context.Customers
                    .Include(x=>x.CivilStatus)
                    .Include(x=>x.PersonTypes)
                    .Include(x=>x.CustomerDetailInfos)
                    .ToListAsync();
                foreach (var item in customers)
                {
                    listCustomer.Add(new CustomersMap
                    {
                        Id = item.Id,
                        FirstName = item.FirstName,
                        SecondName = item.SecondName,
                        SurnName = item.SurnName,
                        SecondSurnName = item.SecondSurnName,
                        Gender = item.Gender,
                        BirthDate = item.BirthDate,
                        Dni = item.Dni,
                        PersonTypeId = item.PersonTypeld,
                        CivilStatusId = item.CivilStatusld,
                        Address = item.Address,
                        CreateAt = item.CreateAt,
                        IsActive = item.IsActive,
                        CivilStatusMap = new CivilStatusMap
                        {
                            Id = item.CivilStatus.Id,
                            Name = item.CivilStatus.Name,
                            Code = item.CivilStatus.Code
                        },
                        PersonTypesMap =  new PersonTypesMap
                        {
                            Id = item.PersonTypes.Id,
                            Name=item.PersonTypes.Name,
                            Code=item.PersonTypes.Code
                        },
                        CustomerDetailInfosMap = item.CustomerDetailInfos == null ? new List<CustomerDetailInfosMap>() : item.CustomerDetailInfos.Select(x => new CustomerDetailInfosMap
                        {
                            Id = x.Id,
                            Value = x.Value,
                            Label = x.Label,
                            CustomerId = x.CustomerId,
                            IsPrimary = x.IsPrimary,
                            CreateAt = x.CreateAt,
                        }).ToList()
                    });
                }
                return listCustomer;
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // GET: api/Customers/5
        /// <summary>
        /// Get CustomerMap by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>CustomerMap</returns>
        [EnableCors("AllowOrigin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomersMap>> GetCustomer(int id)
        {
            try
            {
                var findCustomer = await _context.Customers
                    .Include(x=>x.CivilStatus)
                    .Include(x=>x.PersonTypes)
                    .Include(x => x.CustomerDetailInfos)
                    .FirstOrDefaultAsync(x=>x.Id == id);

                if (findCustomer == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                var customer = new CustomersMap
                {
                    Id = findCustomer.Id,
                    FirstName = findCustomer.FirstName,
                    SecondName = findCustomer.SecondName,
                    SurnName = findCustomer.SurnName,
                    SecondSurnName = findCustomer.SecondSurnName,
                    Gender = findCustomer.Gender,
                    BirthDate = findCustomer.BirthDate,
                    Dni = findCustomer.Dni,
                    PersonTypeId = findCustomer.PersonTypeld,
                    CivilStatusId = findCustomer.CivilStatusld,
                    Address = findCustomer.Address,
                    CreateAt = findCustomer.CreateAt,
                    IsActive = findCustomer.IsActive,
                    CivilStatusMap = new CivilStatusMap
                    {
                        Id = findCustomer.CivilStatus.Id,
                        Name = findCustomer.CivilStatus.Name,
                        Code = findCustomer.CivilStatus.Code
                    },
                    PersonTypesMap = new PersonTypesMap
                    {
                        Id = findCustomer.PersonTypes.Id,
                        Name = findCustomer.PersonTypes.Name,
                        Code = findCustomer.PersonTypes.Code
                    },
                    CustomerDetailInfosMap = findCustomer.CustomerDetailInfos == null ? new List<CustomerDetailInfosMap>() : findCustomer.CustomerDetailInfos.Select(x => new CustomerDetailInfosMap
                    {
                        Id = x.Id,
                        Value = x.Value,
                        Label = x.Label,
                        CustomerId = x.CustomerId,
                        IsPrimary = x.IsPrimary,
                        CreateAt = x.CreateAt,
                    }).ToList()
                };

                return customer;
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }

        }

        [EnableCors("AllowOrigin")]
        [HttpPost("filter")]
        public async Task<ActionResult<IEnumerable<CustomersMap>>> GetCustomerFilter(Filter filter)
        {
            try
            {

                var listCustomer = new List<CustomersMap>();
                var customers = await _context.Customers
                    .Include(x => x.CivilStatus)
                    .Include(x => x.PersonTypes)
                    .Include(x => x.CustomerDetailInfos)
                    .ToListAsync();
                if (!string.IsNullOrEmpty(filter.name))
                {
                    var name = filter.name.ToUpper();
                    customers = customers.Where(x => x.FirstName.ToUpper().Contains(name) || x.SecondName.ToUpper().Contains(name) || x.SurnName.ToUpper().Contains(name) || x.SecondSurnName.ToUpper().Contains(name)).ToList();
                }

                if (filter.dateStar !=null && filter.dateEnd !=null)
                {
                    customers = customers.Where(x => x.CreateAt >= filter.dateStar && x.CreateAt <= filter.dateEnd).ToList();
                }

                foreach (var item in customers)
                {
                    listCustomer.Add(new CustomersMap
                    {
                        Id = item.Id,
                        FirstName = item.FirstName,
                        SecondName = item.SecondName,
                        SurnName = item.SurnName,
                        SecondSurnName = item.SecondSurnName,
                        Gender = item.Gender,
                        BirthDate = item.BirthDate,
                        Dni = item.Dni,
                        PersonTypeId = item.PersonTypeld,
                        CivilStatusId = item.CivilStatusld,
                        Address = item.Address,
                        CreateAt = item.CreateAt,
                        IsActive = item.IsActive,
                        CivilStatusMap = new CivilStatusMap
                        {
                            Id = item.CivilStatus.Id,
                            Name = item.CivilStatus.Name,
                            Code = item.CivilStatus.Code
                        },
                        PersonTypesMap = new PersonTypesMap
                        {
                            Id = item.PersonTypes.Id,
                            Name = item.PersonTypes.Name,
                            Code = item.PersonTypes.Code
                        },
                        CustomerDetailInfosMap = item.CustomerDetailInfos == null ? new List<CustomerDetailInfosMap>() : item.CustomerDetailInfos.Select(x => new CustomerDetailInfosMap
                        {
                            Id = x.Id,
                            Value = x.Value,
                            Label = x.Label,
                            CustomerId = x.CustomerId,
                            IsPrimary = x.IsPrimary,
                            CreateAt = x.CreateAt,
                        }).ToList()
                    });
                }
                return listCustomer;
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }

        }

        // PUT: api/Customers/5
        /// <summary>
        /// Update CustomerMap by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customer">Model</param>
        /// <returns>CustomerMap</returns>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors("AllowOrigin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomersMap customer)
        {
            try
            {
                var listDetail = new List<CustomerDetailInfos>();
                var customerExist = await _context.Customers.Include(x => x.CustomerDetailInfos).FirstOrDefaultAsync(x =>x.Id == id);
                if (customerExist == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                //valid age
                var age = DateTime.Now.Year - customer.BirthDate.Year;

                if (age < 18)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"No cumple con la edad minima de 18 años"));

                customerExist.FirstName = string.IsNullOrEmpty(customer.FirstName) ? customerExist.FirstName : customer.FirstName;
                customerExist.SecondName = string.IsNullOrEmpty(customer.SecondName) ? customerExist.SecondName : customer.SecondName;
                customerExist.SurnName = string.IsNullOrEmpty(customer.SurnName) ? customerExist.SurnName : customer.SurnName;
                customerExist.SecondSurnName = string.IsNullOrEmpty(customer.SecondSurnName) ? customerExist.SecondSurnName : customer.SecondSurnName;
                customerExist.Gender = string.IsNullOrEmpty(customer.Gender) ? customerExist.Gender : customer.Gender;
                customerExist.BirthDate = customer?.BirthDate == null ? customerExist.BirthDate : customer.BirthDate;
                customerExist.Dni = string.IsNullOrEmpty(customer.Dni) ? customerExist.Dni : customer.Dni;
                customerExist.PersonTypeld = customer.PersonTypeId == null ? customerExist.PersonTypeld : customer.PersonTypeId;
                customerExist.CivilStatusld = customer.CivilStatusId == null ? customerExist.CivilStatusld : customer.CivilStatusId;
                customerExist.Address = string.IsNullOrEmpty(customer.Address) ? customerExist.Address : customer.Address;
                customerExist.IsActive = customer?.IsActive == null ? customerExist.IsActive : customer.IsActive;

                if (customer.PhoneNumber != null)
                {
                    var detail = customerExist.CustomerDetailInfos.Where(x => x.CustomerId == customerExist.Id && x.Label == "Phone").FirstOrDefault();
                    detail.Value = customer.PhoneNumber;
                    listDetail.Add(detail);
                }
                if (customer.Email != null)
                {
                    var detail = customerExist.CustomerDetailInfos.Where(x => x.CustomerId == customerExist.Id && x.Label == "Email").FirstOrDefault();
                    detail.Value = customer.Email;
                    listDetail.Add(detail);
                }
                customerExist.CustomerDetailInfos = listDetail;

                _context.Entry(customerExist).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return base.Ok(customerExist);
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // POST: api/Customers
        /// <summary>
        /// Create CustomerMap
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>CustomerMap</returns>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors("AllowOrigin")]
        [HttpPost]
        public async Task<ActionResult<CustomersMap>> PostCustomer(CustomersMap customer)
        {
            try
            {
                var lastId = _context.Customers.OrderByDescending(x => x.Id).FirstOrDefault()?.Id + 1 ?? 1;
                //valid age
                var age = DateTime.Now.Year - customer.BirthDate.Year;

                if (age < 18)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"No cumple con la edad minima de 18 años"));

                var statusCivil = await _context.CivilStatus.FindAsync(customer.CivilStatusId);
                if (statusCivil == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El estado civil no existe"));
                var personType = await _context.PersonTypes.FindAsync(customer.PersonTypeId);
                if (statusCivil == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El tipo de persona no existe"));
                var customerAdd = new Customers();
                var listDetail = new List<CustomerDetailInfos>();
                customerAdd.FirstName = customer.FirstName;
                customerAdd.SecondName = customer.SecondName;
                customerAdd.SurnName = customer.SurnName;
                customerAdd.SecondSurnName = customer.SecondSurnName;
                customerAdd.Gender = customer.Gender;
                customerAdd.BirthDate = customer.BirthDate;
                customerAdd.Dni = customer.Dni;
                customerAdd.PersonTypeld = customer.PersonTypeId;
                customerAdd.CivilStatusld = customer.CivilStatusId;
                customerAdd.Address = customer.Address;
                customerAdd.IsActive = customer.IsActive;
                customerAdd.CreateAt = DateTime.Now;
                if (customer.Email != null)
                    listDetail.Add(new CustomerDetailInfos
                    {
                        Label = "Email",
                        Value = customer.Email,
                        IsPrimary = true,
                        CreateAt = DateTime.Now
                    });
                if (customer.PhoneNumber != null)
                    listDetail.Add(new CustomerDetailInfos
                    {
                        Label = "Phone",
                        Value = customer.PhoneNumber,
                        IsPrimary = true,
                        CreateAt = DateTime.Now
                    });
                if (customer.PhoneNumber2 != null)
                    listDetail.Add(new CustomerDetailInfos
                    {
                        Label = "Phone2",
                        Value = customer.PhoneNumber2,
                        IsPrimary = true,
                        CreateAt = DateTime.Now
                    });
                customerAdd.CustomerDetailInfos = listDetail;
                _context.Customers.Add(customerAdd);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // DELETE: api/Customers/5
        /// <summary>
        /// Detele CustomerMap by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Ok</returns>
        [EnableCors("AllowOrigin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
                return base.Ok(ResponseMessage.Ok(HttpStatusCode.OK, $"Registro Eliminado"));
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }
    }
}
