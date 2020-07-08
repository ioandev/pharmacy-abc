using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetAllAsync();
        Task<Patient> GetByPatientIdOrNullAsync(int patientId);
        Task<Patient> Create(Patient patient);
        Task<Patient> UpdateAsync(Patient patient);
        Task<bool> DeleteAsync(int patientId);
    }
}