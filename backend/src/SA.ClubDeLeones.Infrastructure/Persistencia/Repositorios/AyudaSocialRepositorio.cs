using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class AyudaSocialRepositorio : RepositorioBase<AyudaSocial>, IAyudaSocialRepositorio
{
    public AyudaSocialRepositorio(AppDbContext context) : base(context) { }

    public async Task<IReadOnlyList<AyudaSocial>> ObtenerPorBeneficiarioAsync(Guid beneficiarioId, CancellationToken ct = default)
    {
        return await _dbSet.Where(a => a.BeneficiarioId == beneficiarioId).ToListAsync(ct);
    }

    public async Task<IReadOnlyList<AyudaSocial>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default)
    {
        return await _dbSet.Where(a => a.CampanaId == campanaId).ToListAsync(ct);
    }
}