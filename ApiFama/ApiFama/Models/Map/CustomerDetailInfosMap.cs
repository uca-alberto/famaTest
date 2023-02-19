using ApiFama.Models.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFama.Models.Map
{
    public class CustomerDetailInfosMap
    {
        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Label { get; set; }

        [Required]
        [StringLength(500)]
        public string Value { get; set; }

        public bool IsPrimary { get; set; }
        public DateTime? CreateAt { get; set; }
        public int CustomerId { get; set; }
    }
}
