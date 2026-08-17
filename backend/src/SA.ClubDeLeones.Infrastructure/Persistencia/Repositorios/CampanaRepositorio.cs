using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class CampanaRepositorio : RepositorioBase<Campana>, IRepositorio<Campana>
{
    public CampanaRepositorio(AppDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Campana>> ObtenerPorEstadoAsync(
        SA.ClubDeLeones.Domain.Enums.EstadoCampana estado,
        CancellationToken ct = default)
    {
        return await _dbSet.Where(c => c.Estado == estado).ToListAsync(ct);
    }
}