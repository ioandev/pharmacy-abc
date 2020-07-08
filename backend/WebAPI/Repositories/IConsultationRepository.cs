using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public interface IConsultationRepository
    {
        Task<IEnumerable<Consultation>> GetAllAsync();
        Task<Consultation> GetByConsultationIdOrNullAsync(int consultationId);
        Task<Consultation> CreateAsync(Consultation consultation);
        Task<Consultation> UpdateAsync(Consultation consultation);
        Task<bool> DeleteAsync(int consultationId);
    }
}