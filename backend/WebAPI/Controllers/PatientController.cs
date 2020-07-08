using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository patientRepository;
        private readonly ILogger<PatientController> _logger;

        public PatientController(
            IPatientRepository patientRepository,
            ILogger<PatientController> logger)
        {
            this.patientRepository = patientRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Patient>> Get()
        {
            return await patientRepository.GetAllAsync();
        }

        [HttpGet]
        [Route("{patientId}")]
        public async Task<Patient> GetById(int patientId)
        {
            return await patientRepository.GetByPatientIdOrNullAsync(patientId);
        }

        [HttpPost]
        public async Task<Patient> Create(Patient patient)
        {
            return await patientRepository.Create(patient);
        }

        [HttpPut]
        [Route("{patientId}")]
        public async Task<Patient> Update(Patient patient)
        {
            return await patientRepository.UpdateAsync(patient);
        }

        [HttpDelete]
        [Route("{patientId}")]
        public async Task<bool> Delete(int patientId)
        {
            return await patientRepository.DeleteAsync(patientId);
        }
    }
}
