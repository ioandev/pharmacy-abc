using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // TODO: move actions to a non transactional stored procedure
    public class StatsController : ControllerBase
    {
        private readonly IConsultationRepository consultationRepository;
        private readonly IPatientRepository patientRepository;
        private readonly ILogger<StatsController> _logger;

        public StatsController(
            IConsultationRepository consultationRepository,
            IPatientRepository patientRepository,
            ILogger<StatsController> logger)
        {
            this.consultationRepository = consultationRepository;
            this.patientRepository = patientRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route("consultationsByQuarter")]
        public async Task<ICollection<Stat<DateTime>>> GetConsultationsByQuarter()
        {
            var allConsultations = await consultationRepository.GetAllAsync();

            var qMonths = new[] { 1, 4, 7, 10 };
            var allConsultationsByQ =
                allConsultations.Select(x =>
                {
                    DateTime date = x.OccurredAt;
                    for (int i = 0; i < qMonths.Length; i++)
                    {
                        if (x.OccurredAt.Month >= qMonths[i])
                        {
                            date = new DateTime(x.OccurredAt.Year, qMonths[i], 1);
                        }
                    }

                    return date;
                })
                .GroupBy(x => x)
                .Select(group => new Stat<DateTime>
                {
                    Metric = group.Key,
                    Count = group.Count()
                })
                .OrderBy(x => x.Metric.Ticks)
                .ToList();

            return allConsultationsByQ;
        }

        [HttpGet]
        [Route("patientsByAgeGroup")]
        public async Task<ICollection<Stat<int>>> GetPatientsByAgeGroup()
        {
            var allPatients = await patientRepository.GetAllAsync();

            var ageGroups = new[] { 5, 15, 25, 35, 45, 55, 65, 75, 85, 95 };
            var allPatientsByAgeGroup =
                allPatients.Select(x =>
                {
                    var age = (int)((DateTime.UtcNow - x.DateOfBirth).TotalDays / 365);
                    var result = 0;
                    for (int i = 0; i < ageGroups.Length; i++)
                    {
                        if (age >= ageGroups[i])
                        {
                            result = ageGroups[i];
                        }
                    }

                    return result;
                })
                .GroupBy(x => x)
                .Select(group => new Stat<int>
                {
                    Metric = group.Key,
                    Count = group.Count()
                })
                .OrderBy(x => x.Metric)
                .ToList();

            return allPatientsByAgeGroup;
        }
    }
}
