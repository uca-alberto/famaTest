using System.ComponentModel.DataAnnotations;

namespace ApiFama.Models.Entities
{
    public class CivilStatus
    {
        public int Id { get; set; }

        [Required]
        [StringLength(1)]
        public string Code { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }
    }
}
