using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Helpers;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConsultationController : ControllerBase
    {
        private readonly IConsultationRepository consultationRepository;
        private readonly IPatientRepository patientRepository;
        private readonly ILogger<ConsultationController> _logger;
        private readonly Mapper mapper;

        public ConsultationController(
            IConsultationRepository consultationRepository,
            IPatientRepository patientRepository,
            ILogger<ConsultationController> logger)
        {
            this.consultationRepository = consultationRepository;
            this.patientRepository = patientRepository;
            _logger = logger;

            var configuration = new MapperConfiguration(cfg => {
                cfg.AddProfile<AutoMapperProfile>();
            });
            mapper = new Mapper(configuration);
        }

        [HttpGet]
        public async Task<IEnumerable<Consultation>> Get()
        {
            return await consultationRepository.GetAllAsync();
        }

        [HttpGet]
        [Route("{consultationId}")]
        public async Task<Consultation> GetById(int consultationId)
        {
            return await consultationRepository.GetByConsultationIdOrNullAsync(consultationId);
        }

        [HttpPost]
        public async Task<Consultation> Create(AddConsultation addConsultation)
        {
            var consultation = mapper.Map<AddConsultation, Consultation>(addConsultation);
            var patient = await patientRepository.GetByPatientIdOrNullAsync(addConsultation.PatientId);
            if (patient == null)
            {
                throw new InvalidOperationException($"Patient with id {addConsultation.PatientId} was not found.");
            }

            consultation.Patient = patient;
            return await consultationRepository.CreateAsync(consultation);
        }

        [HttpPut]
        [Route("{consultationId}")]
        public async Task<Consultation> Update(Consultation consultation)
        {
            var patient = await patientRepository.GetByPatientIdOrNullAsync(consultation.Patient.PatientId);
            if (patient == null)
            {
                throw new InvalidOperationException($"Patient with id {consultation.Patient.PatientId} was not found.");
            }
            consultation.Patient = patient; // prevent it from updating patient data (default EF behaviour)
            return await consultationRepository.UpdateAsync(consultation);
        }

        [HttpDelete]
        [Route("{consultationId}")]
        public async Task<bool> Delete(int consultationId)
        {
            return await consultationRepository.DeleteAsync(consultationId);
        }
    }
}
