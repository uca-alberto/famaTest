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
using ApiFama.Utilities;
using System.Net;

namespace ApiFama.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonTypesController : ControllerBase
    {
        private readonly FamaContext _context;

        public PersonTypesController(FamaContext context)
        {
            _context = context;
        }

        // GET: api/PersonTypes
        /// <summary>
        /// Get all records PersonType
        /// </summary>
        /// <returns>IEnumerable<PersonType></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonTypes>>> GetPersonTypes()
        {
            try
            {
                return await _context.PersonTypes.ToListAsync();
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // GET: api/PersonTypes/5
        /// <summary>
        /// Get PersonTypes by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>PersonType</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonTypes>> GetPersonType(int id)
        {
            try
            {
                var personType = await _context.PersonTypes.FindAsync(id);

                if (personType == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                return personType;
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }

        }

        // PUT: api/PersonTypes/5
        /// <summary>
        /// Update PersonTypes by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="personType"></param>
        /// <returns>PersonType</returns>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonType(int id, PersonTypesMap personType)
        {
            try
            {
                if (personType.Code.Length > 1)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El codigo debe contener un caracter"));
                if (personType.Name.Length > 19)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El nombre debe contener máximo 20 caracteres"));
                var typeExist = await _context.PersonTypes.FindAsync(id);
                if (typeExist == null)
                    return NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                typeExist.Code = string.IsNullOrEmpty(personType.Code) ? typeExist.Code : personType.Code;
                typeExist.Name = string.IsNullOrEmpty(personType.Name) ? typeExist.Name : personType.Name;

                _context.Entry(typeExist).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return base.Ok(typeExist);
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // POST: api/PersonTypes
        /// <summary>
        /// Create PersonType
        /// </summary>
        /// <param name="personType"></param>
        /// <returns>PersonType</returns>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PersonTypesMap>> PostPersonType(PersonTypesMap personType)
        {
            try
            {
                if (personType.Code.Length > 1)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El codigo debe contener un caracter"));
                if (personType.Name.Length > 19)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El nombre debe contener máximo 20 caracteres"));
                _context.PersonTypes.Add(new PersonTypes
                {
                    Code = personType.Code,
                    Name = personType.Name,
                });
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPersonType", new { id = personType.Id }, personType);
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }

        }

        // DELETE: api/PersonTypes/5
        /// <summary>
        /// Delete PersonType by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Ok</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonType(int id)
        {
            try
            {
                var personType = await _context.PersonTypes.FindAsync(id);
                if (personType == null)
                    return NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                _context.PersonTypes.Remove(personType);
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
