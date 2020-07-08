using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly DataContext context;

        public PatientRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Patient>> GetAllAsync()
        {
            return await context.Patients.ToListAsync();
        }

        public async Task<Patient> GetByPatientIdOrNullAsync(int patientId)
        {
            return await context.Patients.FirstOrDefaultAsync(p => p.PatientId == patientId);
        }

        public async Task<Patient> Create(Patient patient)
        {
            context.Patients.Add(patient);
            await context.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient> UpdateAsync(Patient patient)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                context.Patients.Update(patient);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
                return patient;
            }
        }

        public async Task<bool> DeleteAsync(int patientId)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                Patient patient = await GetByPatientIdOrNullAsync(patientId);
                if (patient == null)
                {
                    return false;
                }

                context.Patients.Remove(patient);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
        }
    }
}
