using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiFama.Models.Entities
{
    public partial class CustomerDetailInfos
    {
        public int Id { get; set; }


        [Required]
        [StringLength(20)]
        public string Label { get; set; }

        [Required]
        [StringLength(500)]
        public string Value { get; set; }

        public bool IsPrimary { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreateAt { get; set; }
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customers? Customers { get; set; }
    }
}
