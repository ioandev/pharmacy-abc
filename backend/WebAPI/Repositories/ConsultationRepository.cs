using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class ConsultationRepository : IConsultationRepository
    {
        private readonly DataContext context;

        public ConsultationRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Consultation>> GetAllAsync()
        {
            return await context.Consultations
                .Include(c => c.Patient)
                .ToListAsync();
        }

        public async Task<Consultation> GetByConsultationIdOrNullAsync(int consultationId)
        {
            return await context.Consultations
                .Include(c => c.Patient)
                .FirstOrDefaultAsync(c => c.ConsultationId == consultationId);
        }

        public async Task<Consultation> CreateAsync(Consultation consultation)
        {
            consultation.OccurredAt = DateTime.UtcNow;
            context.Consultations.Add(consultation);
            await context.SaveChangesAsync();
            return consultation;
        }

        public async Task<Consultation> UpdateAsync(Consultation consultation)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                context.Consultations.Update(consultation);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
                return consultation;
            }
        }

        public async Task<bool> DeleteAsync(int consultationId)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                Consultation consultation = await context.Consultations.FirstOrDefaultAsync(p => p.ConsultationId == consultationId);
                if (consultation == null)
                {
                    return false;
                }

                context.Consultations.Remove(consultation);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
        }
    }
}
