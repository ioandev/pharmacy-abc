using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class AddConsultation
    {
        [Key]
        public int ConsultationID { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public DateTime OccurredAt { get; set; }

        [Required]
        public string Advice { get; set; }

        [Required]
        public string Symptoms { get; set; }

        [Required]
        public string Medications { get; set; }

        [Required]
        public string Comments { get; set; }
    }
}
