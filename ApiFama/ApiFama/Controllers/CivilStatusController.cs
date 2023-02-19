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
using Microsoft.AspNetCore.Cors;

namespace ApiFama.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CivilStatusController : ControllerBase
    {
        private readonly FamaContext _context;

        public CivilStatusController(FamaContext context)
        {
            _context = context;
        }

        // GET: api/CivilStatus
        /// <summary>
        /// Get all records CivilStatu
        /// </summary>
        /// <returns>IEnumerable<CivilStatu></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CivilStatus>>> GetCivilStatus()
        {
            try
            {
                return await _context.CivilStatus.ToListAsync(); ;
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // GET: api/CivilStatus/5
        /// <summary>
        /// Get CivilStatus by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<CivilStatus>> GetCivilStatus(int id)
        {
            try
            {
                var civilStatus = await _context.CivilStatus.FindAsync(id);

                if (civilStatus == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));


                return civilStatus;
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }

        }

        // PUT: api/CivilStatus/5
        /// <summary>
        /// Update CivilStatus by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="civilStatus"></param>
        /// <returns>CivilStatus</returns>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCivilStatus(int id, CivilStatusMap civilStatus)
        {
            try
            {
                if (civilStatus.Code.Length > 1)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El codigo debe contener un caracter"));
                if (civilStatus.Name.Length > 19)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El nombre debe contener máximo 20 caracteres"));
                var civilExist = await _context.CivilStatus.FindAsync(id);
                if (civilExist == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                civilExist.Code = string.IsNullOrEmpty(civilStatus.Code) ? civilExist.Code : civilStatus.Code;
                civilExist.Name = string.IsNullOrEmpty(civilStatus.Name) ? civilExist.Name : civilStatus.Name;

                _context.Entry(civilExist).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return base.Ok(civilExist);
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }
        }

        // POST: api/CivilStatus
        /// <summary>
        /// Create CivilStatus
        /// </summary>
        /// <param name="civilStatus"></param>
        /// <returns>CivilStatus</returns>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors("AllowOrigin")]
        [HttpPost]
        public async Task<ActionResult<CivilStatusMap>> PostCivilStatus(CivilStatusMap civilStatus)
        {
            try
            {
                if (civilStatus.Code.Length > 1)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El codigo debe contener un caracter"));
                if (civilStatus.Name.Length >19)
                    return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"El nombre debe contener máximo 20 caracteres"));
                _context.CivilStatus.Add(new CivilStatus
                {
                    Code = civilStatus.Code,
                    Name = civilStatus.Name,
                });
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCivilStatus", new { id = civilStatus.Id }, civilStatus);
            }
            catch (Exception ex)
            {
                return base.BadRequest(ResponseMessage.Error(HttpStatusCode.BadRequest, $"Error {ex.Message} {ex.InnerException?.Message} {ex.InnerException?.InnerException?.Message}"));
            }

        }

        // DELETE: api/CivilStatus/5
        /// <summary>
        /// Delete CivilStatus by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Ok</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCivilStatus(int id)
        {
            try
            {
                var civilStatus = await _context.CivilStatus.FindAsync(id);
                if (civilStatus == null)
                    return base.NotFound(ResponseMessage.Error(HttpStatusCode.NotFound, $"El registro no existe"));

                _context.CivilStatus.Remove(civilStatus);
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
