using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiFama.Models.Entities
{
    public class Customers
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string SecondName { get; set; }

        [Required]
        [StringLength(50)]
        public string SurnName { get; set; }

        [Required]
        [StringLength(50)]
        public string SecondSurnName { get; set; }

        [Required]
        [StringLength(1)]
        public string Gender { get; set; }

        public DateTime BirthDate { get; set; }

        [Required]
        [StringLength(50)]
        public string Dni { get; set; }

        [Required]
        [StringLength(255)]
        public string Address { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? CreateAt { get; set; }

        public bool IsActive { get; set; }
        public int? CivilStatusld { get; set; }
        [ForeignKey("CivilStatusld")]
        public CivilStatus? CivilStatus { get; set; }
        public List<CustomerDetailInfos>? CustomerDetailInfos { get; set; }
        public int? PersonTypeld { get; set; }
        [ForeignKey("PersonTypeld")]
        public PersonTypes? PersonTypes { get; set; }
    }
}
