using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Consultation
    {
        [Key]
        public int ConsultationId { get; set; }

        [Required]
        public Patient Patient { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public string Advice { get; set; }

        [Required]
        public string Symptoms { get; set; }

        [Required]
        public string Medications { get; set; }

        [Required]
        public string Comments { get; set; }

        [Column(TypeName = "date")]
        public DateTime OccurredAt { get; set; } = DateTime.UtcNow;
    }
}
