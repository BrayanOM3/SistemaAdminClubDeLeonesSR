using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class CampanaRepositorio : RepositorioBase<Campana>, ICampanaRepositorio
{
    public CampanaRepositorio(AppDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Campana>> ObtenerActivasAsync(CancellationToken ct = default)
    {
        return await _dbSet.Where(c => c.Estado == SA.ClubDeLeones.Domain.Enums.EstadoCampana.Activa).ToListAsync(ct);
    }

    public async Task<decimal> ObtenerMontoRecaudadoAsync(Guid campanaId, CancellationToken ct = default)
    {
        return await _dbSet
            .Where(c => c.Id == campanaId)
            .SelectMany(c => c.Donaciones)
            .Where(d => d.Tipo == SA.ClubDeLeones.Domain.Enums.TipoDonacion.Monetaria && d.Monto.HasValue)
            .SumAsync(d => d.Monto!.Value, ct);
    }
}