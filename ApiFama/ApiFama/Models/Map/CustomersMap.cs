using ApiFama.Models.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiFama.Models.Map
{
    public class CustomersMap
    {
        public int? Id { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string SecondName { get; set; }

        [StringLength(50)]
        public string SurnName { get; set; }

        [StringLength(50)]
        public string SecondSurnName { get; set; }

        [StringLength(1)]
        public string Gender { get; set; }

        public DateTime BirthDate { get; set; }

        [StringLength(50)]
        public string Dni { get; set; }

        [StringLength(255)]
        public string Address { get; set; }

        public DateTime? CreateAt { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PhoneNumber2 { get; set; }

        public bool IsActive { get; set; }
        public int? CivilStatusId { get; set; }
        public CivilStatusMap? CivilStatusMap { get; set; }
        public List<CustomerDetailInfosMap>? CustomerDetailInfosMap { get; set; }
        public int? PersonTypeId { get; set; }
        public PersonTypesMap? PersonTypesMap { get; set; }
    }
}
